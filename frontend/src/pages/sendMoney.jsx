import { useLocation, useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector } from "../GlobalStates/atom";
import { useEffect, useState } from "react";
import axios from "axios";

function SendMoney(props){
    const [amount, setAmount] = useState(0);
    const [transferState, setTransferState] = useState("");
    const [clicked, setClicked] = useState(false);
    function handleClick(e){
        setClicked(true);
    }
    function handleInput(e, state, setState){
        setState(e.target.value)
        console.log(`state :: amount = ${state} :: ${amount}`);
    }

    useEffect(function initiateTransfer(){
        setTransferState("");
        const transferMoney = async ()=>{

            const urlToSendMoney = "http://localhost:3002/api/v1/account/transfer";
            const body = {
                to:props.username,
                amount:amount
            }
            const res = await axios.post(urlToSendMoney, body, {
                headers:{
                    Authorization: 'Bearer '+ localStorage.getItem("jwtToken")
                }
            })
            
            if(res.status == 200){
                setTransferState("Money sent successfully to account "+props.username+" amount Rs "+props.amount);
            }else{
                setTransferState("Not able to send money to account "+props.username);
            }
        }
        if(clicked){
            transferMoney();
            setClicked(false)
        }
        
    },[clicked])
    return (
        <>
            <div>{props.firstname} {props.lastname}</div>
            <div>
                <div className="font-bold">Amount</div>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onInput={(e)=>{handleInput(e, amount, setAmount)}}/>
            </div>
            <button onClick={(e)=>handleClick(e)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Initiate Transfer</button>
            {transferState}
        </>
    )

}

export default function SendMoneyWrapper(props){
    console.log("Send Money element")
    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    const {state} = useLocation();
    const {username, firstname, lastname} = state;
    console.log(`Receiver username:${username},firstname;${firstname}, lastname:${lastname}`);
    console.log(`isLoggedin value = ${loginCheckSelector.contents}`);

    // useEffect(()=>{ 
    //     if(loginCheckSelector.contents){
    //         navigate("/");
    //     }
    // },[]);
    switch(loginCheckSelector.state){
        case "loading": console.log(`isLoggedin value = ${loginCheckSelector.contents}`);
                        console.log("contents................................")
                        console.log(loginCheckSelector.contents)
                        console.log("contents................................")
                        return <>Loading...</>;

        case "hasError":console.log(`isLoggedin value = ${loginCheckSelector.contents}`);
                        console.log("contents................................")
                        console.log(loginCheckSelector.contents)
                        console.log("contents................................")
                         return <>Something went wrong</>;
        case "hasValue" :console.log(`isLoggedin value = ${loginCheckSelector.contents}`);
                        console.log("contents................................")
                        console.log(loginCheckSelector.contents)
                        console.log("contents................................")
                        return( 
                        <>
                            <div className="mt-5 w-fit ml-auto mr-auto p-2 flex flex-col gap-4">
                                <div>Send Money</div>
                                <SendMoney username={username} firstname={firstname} lastname={lastname}/>
                            </div>
                        </>
                        )
         default: return <>Dont know what's happening</>
    }

}