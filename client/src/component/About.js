import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Profile from "../images/Profile.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const About = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userData, setUserData] = useState([]);
    
    const callAboutPage = async() => {
        try{
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
    
            const data = await res.json();
            console.log(data);
            setUserData(data);
            if(res.status !== 200){
                dispatch(showLogin());
                throw new Error(res.err);
            }else{
                dispatch(showLogout());
            }
        }catch(err){
            console.log(err);
            history.push("/login");
        }
    }

    useEffect(()=> {
        AOS.init({duration: 1000});
        callAboutPage();
    }, []);
    return(
        <>
        <div className="about_main"> 
            <div className="about_content" data-aos="fade-down">
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                    <div className="about_section_l">
                        <figure>
                            <img className="profile_image" src={Profile} alt="Profile pic" />
                            <div className="caption">
                            <form method="GET">
                            <figcaption>{userData.name}</figcaption>
                            </form>
                            </div>
                        </figure>
                    </div>    
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="about_section_2">
                            <div className="about_nav mt-3">
                            {/* about navbar here */}
                                <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Profile</a>
                                    {/* <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a> */}
                                </div>
                                </nav>
                                <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <form method="GET">
                                    <div className="row mt-4">
                                        <div className="col-lg-6 col-md-12">
                                            <h6>User Id:</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <p>8898888899</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-6 col-md-12">
                                            <h6>User Name:</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-6 col-md-12">
                                            <h6>Email:</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-6 col-md-12">
                                            <h6>Phone:</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-lg-6 col-md-12">
                                            <h6>Profession:</h6>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                {/* <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div> */}
                                </div>
                            </div>             
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default About;