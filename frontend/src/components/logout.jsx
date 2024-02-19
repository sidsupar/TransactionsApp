import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { isLoggedInSelector, setLogin } from "../GlobalStates/atom";
async function logoutUser(){
    try{
        axios.defaults.withCredentials = true;
        const urlToLogout = "http://localhost:3002/api/v1/user/logout"
        const res = await axios.get(urlToLogout,{
            headers:{
                Authorization: "Bearer " +localStorage.getItem("jwtToken")
            }
        });
        if(res.status == 200){
            return {
                msg:res.data.msg,
                logoutStatus:true
            }
        }else{
            return {
                msg:res.data.msg,
                err:res.data.msg,
                logoutStatus:false
            }
        }
    }catch(err){
        console.log("Not able to logout "+err)
    }
}
export default function Logout(){
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [logoutStatus, setLogoutStatus] = useState(false);
    const setLoginState = useSetRecoilState(setLogin);
    const navigate = useNavigate();

    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    
    useEffect(()=>{
        const logoutUserMethod = async ()=>{
            const res = await logoutUser();
            if(res.logoutStatus){
                console.log(res);
                setLogoutStatus(true);
            }else{
                console.log(res);
                setLogoutStatus(false);
            }
        }
        if(logoutClicked){
            logoutUserMethod()
            setLogoutClicked(false);
        }
    },[logoutClicked])

    useEffect(()=>{
        if(logoutStatus){
            setLoginState(false);
            navigate("/signin")
            setLogoutStatus(false)
        }
    },[logoutStatus])

    return(
        <>
            {
            loginCheckSelector.contents ? 
                <div>
                <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=>{setLogoutClicked(true)}}>Logout</button>
                
                </div>:
                null
            } 
        </>
        
    )
}