import React, { useEffect, useState } from "react";
import Signin from "../images/Signup.png";
import {NavLink, useHistory} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Signup = () => {

    const history = useHistory();

    const [userInput, setUserInput] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }
    
    const postData = async(e) => {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = userInput;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registraion Successful");
            console.log("Registraion Successful");
            history.push("/login");
        }
    }

    useEffect(()=> {
        AOS.init({duration: 1000});
    }, []);

    return(
        <>
        <div className="signup_main">
            <div className="signup_content" data-aos="fade-up">
                <div className="from_title">
                <h1>Signup</h1>
                </div>
                <div className="container">
                <div className="row outer_col">
                    <div className="col-md-6 inner_col">
                        <form method="POST">
                            <div className="form_content">
                            <label htmlFor="name"><i class="fas fa-user-alt"></i></label>
                             <input onChange={handleChange} name="name" value={userInput.name} className="form_input" id="name" type="text" required placeholder="Name" autoFocus></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="email"><i class="fas fa-envelope"></i></label>
                             <input onChange={handleChange} name="email" value={userInput.email} className="form_input" id="email" type="text" required placeholder="Email"></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="phone"><i class="fas fa-phone-volume"></i></label>
                             <input onChange={handleChange} name="phone" value={userInput.phone} className="form_input" id="phone" type="text" required placeholder="Phone"></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="work"><i class="fas fa-briefcase"></i></label>
                             <input onChange={handleChange} name="work" value={userInput.work} className="form_input" id="work" type="text" required placeholder="Work"></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="password"><i class="fas fa-lock"></i></label>
                             <input onChange={handleChange} name="password" value={userInput.password} className="form_input" id="password" type="password" required placeholder="Passowrd"></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="cpassword"><i class="fas fa-lock"></i></label>
                             <input onChange={handleChange} name="cpassword" value={userInput.cpassword} className="form_input" id="cpassword" type="password" required placeholder="Confirm passowrd"></input>
                            </div>
                            <div className="form_content_button">
                            <button onClick={postData} className="btn btn-primary" type="submit">Sign In</button>
                            </div>                           
                        </form>
                        
                    </div>
                    <div className="col-md-6 from_gif" >
                        <div >
                            <img className="from_img" src={Signin} alt="From image" />
                        </div>
                        <div className="mt-3 mb-2"> 
                        <NavLink to="/login">I am already registered</NavLink>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;