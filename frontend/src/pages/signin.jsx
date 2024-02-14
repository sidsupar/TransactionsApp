import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import SignLogin from "../components/signLogin"
import { isLoggedInSelector, setLogin } from "../GlobalStates/atom"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { startTransition, useDeferredValue } from "react";

export default function SignIn(props){
    console.log("SignIn element");
    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    console.log(`isLoggedin value = ${loginCheckSelector.contents}`);

    useEffect(()=>{ 

        if(loginCheckSelector.contents){
            navigate("/");
        }

    },[]);
    
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
                                <div>SignIn Page</div>
                                <SignLogin formType={"signIn"} />
                            </div>
                        </>
                        )
         default: return <>Dont know what's happening</>
    }

}