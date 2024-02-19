import axios from "axios";
import {atom, selector} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const setLogin = atom({
    key:"setLoginKey",
    default:false,
    effects_UNSTABLE: [persistAtom],
})

export const userData = atom({
    key:"userDataKey",
    default:{},
    effects_UNSTABLE: [persistAtom],
})

export const isLoggedInSelector = selector({
    key:"isLoggedIn",
    get:async ({get})=>{
        axios.defaults.withCredentials = true;
        const token = localStorage.getItem("jwtToken");
        const setLog = get(setLogin);
        console.log(setLog)
        console.log(`token = ${token}`);            
        //http://localhost:3002/api/v1/user/signup
        try{         
            console.log(`checking login status`)
            const res = await axios.get("http://localhost:3002/api/v1/user/checkLoginStatus",{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            if(res.status == 201){
                console.log(`Selector check Login status called: status: true`);
                get(setLogin)
                return true
            }else{
                console.log(`Selector check Login status called: status: false`);
                get(setLogin)
                return false
            }
        }catch(err){
            console.log("Error in selector call: "+err.message);
            return false;
        }
    },
    effects_UNSTABLE: [persistAtom],
})