import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { verifyOtp } from "../services/api";


const EnterOtp = () => {
  const [otp, setOtp] = useState(null)
  const navigate= useNavigate();
  const userPhoneNumber = localStorage.getItem('userPhoneNumber');
  

  const onSubmitOTP = async(e) => {

    // alert()
    e.preventDefault()

    const code = otp

    // console.log(code)
    // window.confirmationResult.confirm(code).then((result) => {

      // const user = result.user;
      // console.log(JSON.stringify(user))
      // alert("User is verified",code)
      const data = {
       phoneNumber:Number(userPhoneNumber),
       otp:Number(code)
      };

      console.log('data',data)
      verifyOtp(data)
      .then((response) => {

        console.log('response',response)
         console.log('OTP verified:', response.message);
         navigate('/changepassword')
      }).catch((error) => {
        console.log('Some issue while top verification - ',error)
      });
     

  }

  return (
    <>

      <h2>Enter OTP</h2>

      <form onSubmit={(e) => onSubmitOTP(e)}>
        <input type="number" name="otp" placeholder="OTP Number" value={otp} required onChange={(e) => setOtp(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </>
  )
};
export default EnterOtp;