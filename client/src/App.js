import React from "react";
import {Switch, Route} from "react-router-dom";
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import About from "./component/About";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Error from "./component/Error";
import Logout from "./component/Logout";

const App = () => {
  return(
    <>
      <Navbar />
      <Switch>
        <Route exact path="/Authentication-MERN-Stack-Project" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;