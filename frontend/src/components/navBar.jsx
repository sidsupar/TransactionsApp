import {Link} from "react-router-dom"
import Logout from "./logout";
import { useRecoilValueLoadable } from "recoil";
import { isLoggedInSelector } from "../GlobalStates/atom";

let links = [
    {
        linkName:"Home",
        linkRoute:"/"
    },
    {
        linkName:"Sign Up",
        linkRoute:"/signup"
    },
    {
        linkName:"Sign In",
        linkRoute:"/signin"
    },
    {
        linkName:"Dashboard",
        linkRoute:"/dashboard"
    },

];

export default function NavBar(props){
    
    const loginCheckSelector = useRecoilValueLoadable(isLoggedInSelector);
    if(loginCheckSelector.contents){
        links = links.filter((link)=> link.linkName != "Sign In" || link.linkName != "Sign Up");
    }
    return(
        <div className="flex justify-around bg-black text-white mt-10 w-4/5 ml-auto mr-auto rounded-xl h-[10%]">
            {
                links.map((link, index)=>{

                    return(
                        <div key={index} className="ease-in duration-300 hover:bg-gray-500 p-1 m-auto font-medium text-lg">
                             <Link to={link.linkRoute}>{link.linkName}</Link>                                
                        </div>
                    )
                })
            }
            <Logout />
        </div>
    )

}