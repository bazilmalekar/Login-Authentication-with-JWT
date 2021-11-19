import React, {useEffect, useState} from "react";
import Signin from "../images/Signup.png";
import {NavLink, useHistory} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {useSelector, useDispatch} from "react-redux";
import {showLogin, showLogout} from "../Redux/action/index";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setLoginInput({
            ...loginInput,
            [name]: value
        });
    }

    const postData = async(e) => {
        try{
            e.preventDefault();

            const {email, password} = loginInput;
    
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
            if(res.status === 422 || !data){
                window.alert("Invalid Credentials");
                console.log("Invalid Credentials");
            }else{
                history.push("/Authentication-MERN-Stack-Project");
            }
            dispatch(showLogout());
        }catch(err){
            console.log(err);
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
                <h1>Login</h1>
                </div>
                <div className="container">
                <div className="row outer_col">
                    
                    <div className="col-md-6 from_gif" >
                        <div >
                            <img className="from_img" src={Signin} alt="From image" />
                        </div>
                        <div className="mt-3 mb-2"> 
                        <NavLink to="/signup">Please Signup</NavLink>
                        </div>
                    </div>
                    <div className="col-md-6 inner_col">
                        <form method="POST">
                            <div className="form_content">
                            <label htmlFor="email"><i class="fas fa-envelope"></i></label>
                             <input onChange={handleChange} name="email" value={loginInput.email} className="form_input" id="email" type="text" required placeholder="Email" autoFocus></input>
                            </div>
                            <div className="form_content">
                            <label htmlFor="password"><i class="fas fa-lock"></i></label>
                             <input onChange={handleChange} name="password" value={loginInput.password} className="form_input" id="password" type="password" required placeholder="Passowrd"></input>
                            </div>
                            <div className="form_content_button">
                            <button onClick={postData} className="btn btn-primary" type="submit">Log In</button>
                            </div>                           
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;