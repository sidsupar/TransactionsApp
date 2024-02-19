import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function useGetUsers(searchValue=""){
    
    axios.defaults.withCredentials = true;
    const [users, setUsers] = useState([]);
    const [loading, setLodaing] = useState(true);
    try{
        useEffect(()=>{
            const getUsers = () =>{
                setLodaing(true);
                setTimeout(async ()=>{                    
                        const res = await axios.get("http://localhost:3002/api/v1/user/bulk?filter="+searchValue, {
                            headers:{
                                Authorization: "Bearer " +localStorage.getItem("jwtToken")
                            }
                        });

                        console.log("User fetching hook --------------------------------------------")
                        console.log(res)
                        console.log("User fetching hook --------------------------------------------")
                        if(res.status == 200){
                        setUsers(res.data.filteredData);
                        setLodaing(false);
                    }else{
                    throw new Error("Coudn't fetch users");
                    }      
                },100)                      
            }
            getUsers();
        },[searchValue])        
    }
    catch(err){
        throw new Error(err.message);
    }
    return {
        users,
        loading
    };
}

const ShowUsers = memo(function ShowUsers(props){

    const handleSendMoney = useEffect((e, toUsername)=>{
        const initiateSendMoney = async ()=>{
               const urlToSendMoney = "";
               const body = {
                username: toUsername
               }
               const res = await axios.post(urlToSendMoney, body, {
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem("jwtToken")
                }
               }) 
        }
        initiateSendMoney();
    },[])

    return(
        <div>
            {props.users.map((user, index) => {
                return (
                    <>
                        <div key={index} className="flex justify-between w-full border-2 border-black">
                            <div>{user.firstname != undefined ? user.firstname : "Null"} {user.lastname != undefined ? user.lastname : "Null"}</div>
                            <Link to="/send"
                                state={{
                                    username:user.username,
                                    firstname:user.firstname,
                                    lastname:user.lastname                                                            
                                }}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Send Money
                            </Link>
                        </div>
                    </>
                )
            })}
        </div>
    )
});
const SearchBar = memo(function SearchBar(){
    const [searchValue, setSearchValue] = useState("");
    const {users, loading} = useGetUsers(searchValue);

    function handleSearchInput(e){
        setSearchValue(e.target.value);
        console.log(`Search Value: ${searchValue}`);
    }
    
    return(
        <>
            <div><input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onInput={(e)=>{handleSearchInput(e)}}/></div>
            {loading == true ? "Loading..." : <ShowUsers users={users} />}
        </>
    )
     
})

export default memo(function UserSearchWithOption(){

    return(
        <>
            <div>Search</div>
            <SearchBar />
        </>
    )

});