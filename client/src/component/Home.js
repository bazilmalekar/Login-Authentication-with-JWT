import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const Home = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [homeData, setHomeData]  = useState({userName: ""});

    const callHomepage = async() => {
        try{
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setHomeData({userName: data.name});
            setShow(true);
            if(res.status === 200){
                dispatch(showLogout());
            }else{
                dispatch(showLogin());
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        AOS.init({duration: 2000});
        callHomepage();
    },[]);
    return(
        <>
        <div className="home_div">
        <div className="description">
        <div className="details" data-aos="fade-in">
        <p>Welcome</p>
        {show && <h2>Glad to see you {homeData.userName} </h2>}
        <h1>We are the MERN Developers!</h1>
        </div>
        </div>
        </div>
        </>
    );
}

export default Home;