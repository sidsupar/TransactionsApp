import axios from "axios";
import { useEffect, useState } from "react";

function useFetchUerBalance(){
    const [userBalance, setUserBalance] = useState(0);
    
    axios.defaults.withCredentials = true;
    try{
        useEffect(()=>{
            const userBalancePoll = setInterval(async ()=>{
                const userbalanceUrl = "http://localhost:3002/api/v1/account/balance";
                const res = await axios.get(userbalanceUrl,{
                    headers:{
                        Authorization: "Bearer " +localStorage.getItem("jwtToken")
                    }
                });
                console.log("Account Balance hook-------------------------")
                console.log(res)
                console.log("Account Balance hook-------------------------")
                if(res.status == 200){
                    setUserBalance(res.data.balance);
                }else{
                    throw new Error("Couldn't get user balance");
                }
            },2000)
    
            return ()=>{
                clearInterval(userBalancePoll)
            }
        }
        ,[userBalance]);
        return userBalance;
    }catch(err){
        return (err.message);
    }    
}

export default function ShowBalance(){

    const userBalance = useFetchUerBalance();
    return(
        <>
            <span className="font-bold">Your Balance: </span><span className="">{userBalance}</span>
        </>
    )

}