import { useNavigate } from "react-router";
import SignLogin from "../components/signLogin"
import { useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector } from "../GlobalStates/atom";
import { useEffect } from "react";

export default function SignUp(props){
    console.log("SignUp element")
    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    console.log(`isLoggedin value = ${loginCheckSelector.contents}`);

    useEffect(()=>{ 
        if(loginCheckSelector.contents){
            navigate("/");
        }

    },[]);
    return(
        <div className="mt-5 w-fit ml-auto mr-auto p-2 flex flex-col gap-4">
            SignUp page
            <SignLogin formType={"signUp"} />
        </div>
    )

}