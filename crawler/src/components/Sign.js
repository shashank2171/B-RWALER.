import React,{useState} from 'react';
import SignInForm from "./SignInForm.js";
import SignUpForm from "./SignUpForm.js";



export default function Sign() {
    const [isShown, setIsShown] = useState(false);
    const [isShownSignUp, setIsShownSignUp] = useState(true);
  
    const handleClick = event => {
   
      setIsShown(current => !current);
      setIsShownSignUp(current => !current);
  
      
    };
  
    return (
      <div>
      
        
        {isShown && <SignInForm />}
        {isShownSignUp}
  
    
        {isShownSignUp && <SignUpForm />}

        {isShown && <><div className="confirmBox">
          <div className="confirm">Want to register?</div>
          <button onClick={handleClick} className="click">Sign Up</button>
          </div></>}
        
        {isShownSignUp && <>
          <div className="confirmBox">
          <div className="confirm">Already registered?</div>
          <button onClick={handleClick} id='log' className="click">Log in</button>
        </div></>}
        
      
      </div>
    );
  }
  