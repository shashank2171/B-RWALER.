import React, { useState} from "react";
import axios from "axios";

function SignUpForm() {
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = validate(formValues)
    setFormErrors(f);

    if(Object.keys(f).length === 0){
      axios(configuration)
      .then((result) => {
        
        console.log(result);
        // setIsSubmit(true);

        const click = function simulateClick() {
          const btn = document.getElementById('log');
          btn.click();
        }
        click();
      })
      .catch((error) => {
        let err = error.response.data.error.keyPattern;
        let m ="";
        if(err.hasOwnProperty("email")){
          m = "Account already exists, please login";
        }
        else if(err.hasOwnProperty('password')){
          m = "invalid password";
        }
        else{
          m = "Server error";
        }
        alert(m);
      });
    }
    
    // setIsSubmit(true);
  };

  // useEffect(() => {
  //   //console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // });
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  const configuration = {
    method: "post",
    url: "http://localhost:3001/register",
    data: formValues,
  };

  // change container to containerSign
  return (
    <div className="containerSign">
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed up successfully</div>
      ) : (
        <pre></pre>
      )} */}

      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Input name"
              value={formValues.name}
              onChange={handleChange}
              className="fieldBox"
            />
          </div>
          <p className="errors">{formErrors.name}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Input email"
              value={formValues.email}
              onChange={handleChange}
              className="fieldBox"
            />
          </div>
          <p className="errors">{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Input Password"
              value={formValues.password}
              onChange={handleChange}
              className="fieldBox"
            />
          </div>
          <p className="errors">{formErrors.password}</p>
          <button className="ui button">Submit</button>
        </div>
      </form>
    </div>
  );
}

// change fluid ui button blue to ui button

export default SignUpForm;