import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector, userData } from "../GlobalStates/atom";
import ShowBalance from "../components/showBalanceComponent";
import UserSearchWithOption from "../components/searchUsers";

export default function Dashboard(props){

    const navigate = useNavigate();
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    const userDataValue = useRecoilValue(userData);
    useEffect(()=>{ 

        if(!loginCheckSelector.contents){
            navigate("/signin");
        } 

    },[loginCheckSelector.contents]);

    return(
        <div className="flex flex-col">
            <div className="font-bold ml-auto mr-auto mt-5">
                Dashboard
            </div>
            <div>
                <ShowBalance />
                <UserSearchWithOption />
            </div>
        </div>
    )

}