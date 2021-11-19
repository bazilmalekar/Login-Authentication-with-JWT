import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const callLogout = async()=> {
        try{
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if(res.status === 200){
                history.push("/login", {replace: true});
            }else{
                throw new Error(res.err);               
            }
            dispatch(showLogin());
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=> {
        callLogout();
    });
    
    return(
        <>
        <h1>Logout Page!</h1>
        </>
    );
}

export default Logout;