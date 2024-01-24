import { Outlet } from "react-router";
import NavBar from "./navBar.jsx";

export default function Layout(props){

    return(
        <div>
            <NavBar />
            <Outlet />
        </div>    
    )

}