import React, { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import { cookies } from "../App";



function SignInForm() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = validate(formValues);
    setFormErrors(f);

    if(Object.keys(f).length === 0){
      axios(configuration)
      .then((result) => {
        // alert("Signed in succesfully")
        console.log(result);
        setIsSubmit(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        cookies.set("NAME", result.data.name,{
          path:"/",
        })

        cookies.set("EMAIL", result.data.email,{
          path:'/',
        })
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("name", result.data.name);

    
        console.log(cookies.get("TOKEN"));
        console.log(result.data);
      
        const click = function simulateClick() {
          const btn = document.getElementById('menu');
          btn.click();
        }
        click();
      })
      .catch((error) => {
        
        error = new Error();
        console.log(error);
        alert("wrong credentials")
      });
    }

  };

  useEffect(() => {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      
    }
  });
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const configuration = {
    method: "post",
    url: "http://localhost:3001/login",
    data: formValues,
  };

// change container to containerSign

  return (
    <div className="containerSign"> 
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed Up successfully</div>
      ) : (
        <pre></pre>
      )} */}

      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          {/* <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p> */}
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Input email"
              value={formValues.email}
              onChange={handleChange}
              className = "fieldBox"
            />
          </div>
          <p className="errors">{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Input password"
              value={formValues.password}
              onChange={handleChange}
              className = "fieldBox"
            />
          </div>
          <p className="errors">{formErrors.password}</p>
          <button  id="sub" className="ui button">Submit</button>
        </div>
      </form>
    </div>
  );
}


// change fluid ui button blue to ui button
export default SignInForm;