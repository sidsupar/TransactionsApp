import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector, setLogin, userData } from "../GlobalStates/atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "../components/navBar";

export default function Home(props){
    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    const userDataValue = useRecoilValue(userData);
    useEffect(()=>{ 

        if(!loginCheckSelector.contents){
            navigate("/signin");
        }

    },[loginCheckSelector.contents]);
    
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
        case "hasValue" :
                        console.log(`isLoggedin value = ${loginCheckSelector.contents}`);
                        console.log("contents................................")
                        console.log(loginCheckSelector.contents)
                        console.log("contents................................")
                        return( loginCheckSelector.contents == true ?(
                                <>
                                    <div className="mt-5 w-fit ml-auto mr-auto p-2 flex flex-col gap-4">
                                        <div className="flex justify-start gap-2">
                                            <div className="font-bold">Welcome</div> 
                                            <div>
                                                {userDataValue.firstname} {userDataValue.lastname}                                            
                                            </div>
                                        </div>
                                    </div>
                                </>
                                ):(<>
                                    Not logged in
                                </>)
                        )
         default: return <>Dont know what's happening</>
    }

}