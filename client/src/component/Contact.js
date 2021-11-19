import React, {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const Contact = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({name: "", email: "", phone: "", message: ""});

    const callContactPage = async() => {
        try{
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    //Not using Accept: "application/json" since we are not getting Tokne
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                //Not using credentials: "include" since we are not getting Tokne for authentication
                credentials: "include"
            });
    
            const data = await res.json();
            setUserData({...userData, name: data.name, email: data.email, phone: data.phone});
            if(res.status !== 200){
                dispatch(showLogin());
                throw new Error(res.err);
            }else{
                dispatch(showLogout());
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        AOS.init({duration: 2000});
        callContactPage();
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    const handleClick = async(e) => {
        try{
            e.preventDefault();
            const {name, email, phone, message} = userData;

            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, message
                })
            });

            const data = await res.json();
            if(!data){
                console.log("Message not sent");
            }else{
                alert("Message sent");
                setUserData({...userData, message: ""});
            }
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <>
        <div className="contact_main">
            <div className="p_content pt-5">
                <div className="container">
                <div className="row" data-aos="fade-down">
                    <div className="col-lg-4 col-md-12">
                        <div className="p_details">                   
                            <div className="p_icon">
                                <i class="fas fa-phone-volume"></i>
                            </div>
                            <div className="p_text">
                                <h6>Phone</h6>
                                <p>+91 9876543211</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="p_details">
                            <div className="p_icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div className="p_text">
                                <h6>Email</h6>
                                <p>a1b2c3@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="p_details">
                            <div className="p_icon">
                                <i class="fas fa-address-book"></i>
                            </div>
                            <div className="p_text">
                                <h6>Address</h6>
                                <p>Karnataka, India</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* from here */}
            <div className="contact_from mt-5 mb-5" data-aos="fade-up">
                <form method="POST">
                <div className="form_title">
                <h2>Get in touch!</h2>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <div className="form_details">
                            <input className="input_details" type="text" placeholder="Your Name" onChange={handleChange} name="name" value={userData.name} required/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="form_details">
                            <input className="input_details" type="email" placeholder="Your Email" onChange={handleChange} name="email" value={userData.email} required/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="form_details">
                            <input className="input_details" type="text" placeholder="Your Phone Number" onChange={handleChange} name="phone" value={userData.phone} required/>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="form_details">
                            <textarea className="input_details" rows="5" cols="10" placeholder="Your Message" onChange={handleChange} name="message" value={userData.message} required/>
                            <button onClick={handleClick} className="btn btn-primary from_button" type="submit">Submit</button>
                        </div>    
                    </div>
                </div>
                </form>
            </div>     
        </div>
        </>
    );
}

export default Contact;