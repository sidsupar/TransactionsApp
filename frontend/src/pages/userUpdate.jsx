import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { setLogin, userData } from "../GlobalStates/atom";
import { useNavigate } from "react-router";

async function useUserUpdate(props){
    // const userDataSetState = useSetRecoilState(userData);
    axios.defaults.withCredentials = true

    const userUpdateBody = {
        username:props.userName,
        password:props.password,
        lastname:props.lastName,
        firstName:props.firstName
    }
    console.log(`username received for login = ${props.userName}`)
    console.log(`password received for login = ${props.password}`)

    const url = "http://localhost:3002/api/v1/user/";
    try{
        const res = await axios.put(url, userUpdateBody, {
            headers:{
                Authorization: "Bearer " +localStorage.getItem("jwtToken")
            }
        })
        if(res != undefined){
            if(res.status == 201){
                console.log("Response Received in User Update");
                console.log(res)
                return {
                    data:{
                        msg:res.data.msg,
                        status:"ok"
                    }
                }
            }else{
                throw new Error("Error occured while logging in error: "+ res.data.err);
            }
        }
    }catch(err){
        console.log("Error while updating user data");
        return {
            error:err,
            status:"bad"
        }
    }

}

function SubmitButton(props){
    const [submitClick, setSubmitClick] = useState(false);

    const navigate = useNavigate();
    function handleSubmit(e){
        setSubmitClick((val)=>!val);
    }

    useEffect(()=>{
        const userUpdateDataMethod = async ()=>{
            
            const res = await useUserUpdate(props);
            console.log(res)
            if(res.data!=undefined){                
                if(res.data.status == "ok"){
                    console.log("User updated successfully");
                    navigate("/");
                }else{
                    console.log("User update failed"+res.error)
                }   
            }
        }
        if(submitClick){
            userUpdateDataMethod();
            setSubmitClick(false);
        }
        
    },[submitClick]);

    return(
        <>
            <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </>
    )

}


function Password(props){
    const passwordRef = useRef();
    return(
        <>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input ref={passwordRef} onChange={(e)=>{props.handleInput(e, props.password, props.setPassword)}} value={props.password} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc1234A@" required />
            </div>
        </>
    )

}

function LastName(props){
    const lastName = useRef();
    return(
        <>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input ref={lastName} onChange={(e)=>{props.handleInput(e, props.lastname, props.setLastname)}} value={props.lastname} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
            </div>
        </>
    )

}
function FirstName(props){
    const firstname = useRef();
    return(
        <>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input ref={firstname} onChange={(e)=>{props.handleInput(e, props.firstName, props.setFirstname)}} value={props.firstName} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
            </div>
        </>
    )

}

function Username(props){
    const userName = useRef();
    return(
        <>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input ref={userName} onChange={(e)=>{props.handleInput(e, props.usernameVal, props.setUsernameVal)}} value={props.usernameVal} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jhonDoe@xyz.com" required />
            </div>
        </>
    )

}

export default function UserUpdate(){

    const [usernameVal, setUsernameVal] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const userDataValue = useRecoilValue(userData);
    function handleInput(e, state, setState){
        setState(e.target.value);
        console.log(`${state}`)
    }

    return(
        <div className="transition ease-in-out delay-2000 p-2 flex flex-col gap-1.5 w-max border border-gray-300 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] focus-within:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <Username handleInput={handleInput} usernameVal={usernameVal} setUsernameVal={setUsernameVal}/>
            <FirstName handleInput={handleInput} firstName={firstName} setFirstname={setFirstname}/>
            <LastName handleInput={handleInput} lastname={lastname} setLastname={setLastname}/>
            <Password handleInput={handleInput} password={password} setPassword={setPassword}/>
            <SubmitButton userName={userDataValue.username} firstName={firstName} lastName={lastname} password={password}/>
        </div>
    )

}