import React ,{useState}from 'react';
import {  toast } from 'react-toastify';
import { sendOtp } from '../services/api';

export default function ForgotPasswor () {
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendOTP = async (e) => {
        e.preventDefault();
      
        if (email === "") {
          toast.error("email is required!", {
            position: "top-center"
          });
        } else if (!email.includes("@")) {
          toast.warning("includes @ in your email!", {
            position: "top-center"
          });
        } else {
          try {
            const data = await sendOtp(email);
      
            if (data.message === "OTP sent successfully") {
              setEmail("");
              setMessage(true);
            } else {
              toast.error("Invalid User", {
                position: "top-center"
              });
            }
          } catch (error) {
            console.error(error);
            toast.error("Failed to send OTP", {
              position: "top-center"
            });
          }
        }
      };
      
  return (<>
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
        <h1 style={{ textAlign: 'center' }}>Reset Your Password</h1>
        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Otp sent to your email</p> : ""}
        <label style={{ margin: '10px', textAlign: 'center' }}>
          Enter your email
          <br></br>
          <br></br>
          <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' style={{ width: '300px' }} />

        </label>
        <button type="submit" onClick={sendOTP} style={{ margin: '10px', display: 'block', width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>Reset </button>
      </form>
      
    </div>
     </>

  );
};
