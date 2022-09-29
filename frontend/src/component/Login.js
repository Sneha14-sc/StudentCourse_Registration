import React, { useEffect } from 'react'
import './login.css';
import jwt_decode from 'jwt-decode';
import {useNavigate } from 'react-router';
import axios from "axios";

const Login = () => {
  let navigate =useNavigate();

async function handleCallbackResponse(response) {
   console.log(response)
   // jwt help to convert the access token to meaning full information
   var userObject = jwt_decode(response.credential);
   sessionStorage.setItem("token", JSON.stringify(userObject));
    const value = await axios.get("http://localhost:3005/home", {
      headers: {
        authorization: `Bearer ${response.credential}`, // Verification purpose
      }
    });
   navigate("/dashboard");
}

// google account login 
useEffect(() => {
   /*global google*/
   google.accounts.id.initialize({
       client_id: "470578554711-e2s97i5i1hklicjhp31241cqplrh1ej7.apps.googleusercontent.com",
       callback: handleCallbackResponse
   });

   google.accounts.id.renderButton(
       document.getElementById("signInDiv"),
       {  size: "large", align: "center" }
   )
});



return (
  <div className="box-form">
      <div className="left">
          <div className="overlay">
              <h1>Student -Course Registration</h1>
              <p>Details of students with list of courses</p>
                  <div id="signInDiv"></div>
                  
          </div>
      </div>
   </div>
)
}
export default Login;


