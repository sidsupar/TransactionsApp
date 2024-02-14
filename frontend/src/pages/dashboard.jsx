import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector } from "../GlobalStates/atom";

export default function Dashboard(props){

    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    
    useEffect(()=>{ 

        if(!loginCheckSelector.contents){
            navigate("/signin");
        }

    },[]);

    return(
        <>
            <div>
                Dashboard
            </div>
        </>
    )

}