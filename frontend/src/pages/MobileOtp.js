import React,{useState} from 'react'
import firebase from '../authentication/firebase'
import {useNavigate} from 'react-router-dom'
import { sendMobileOtp } from "../services/api";


function MobileOtp()  {

  const[mobile , setMobile] = useState(null)
  const navigate=useNavigate();
 
 


  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        

        onSignInSubmit();

        console.log("Recaptca varified")
      },
      'defaultCountry': 'IN',
    });
  }
  
  const onSignInSubmit = (e) => {
    e.preventDefault()

    configureCaptcha()

   
    const phoneNumber = "+91" + mobile
    
   localStorage.setItem('userPhoneNumber', phoneNumber); 
    
    


    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
  
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
       

        console.log("confirmationResult",confirmationResult)


        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent",confirmationResult,confirmationResult.confirm.verificatinCode)
       
       
        const data = {
          otp: 123456, 
          phoneNumber: phoneNumber,
        };
        sendMobileOtp(data)
        .then((response) => {
          console.log('OTP sent successfully:', response.data.message);
        })
        navigate('/verifyotp')
  
  
      }).catch((error) => {
       
        console.log("SMS not sent",error)
      });
  }
  
  


    return (
      <div>
        <h2>Forgot password</h2>
       
        <form onSubmit={onSignInSubmit}>

          <div id="sign-in-button"></div>
        
          <input type="number" name="mobile" placeholder="Mobile number" value={mobile} required onChange={ (e) => setMobile(e.target.value)}/>

          <button type="submit"   >Submit</button>
        </form>

       
      </div>
    )

}
export default MobileOtp