import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/api';


 const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const userPhoneNumber = localStorage.getItem('userPhoneNumber');
  const navigate = useNavigate();
  const phoneNumber=userPhoneNumber
 
  const [successMsg, setSuccessMsg] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      alert(phoneNumber)
      const res = await changePassword({phoneNumber, newPassword, confirmPassword });
      
      if (res.status === 200 && res.data) {  
        console.log("Password Changed.");
        setSuccessMsg("Password changed successfully.");
        navigate('/login')
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  

  return (
    <div>
     
      <h3>Reset Password</h3>
      <form onSubmit={handlePasswordReset}>
        <label>
          New password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Confirm new password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
        {successMsg && <p>{successMsg}</p>}
      </form>
      {errorMsg && <p>{errorMsg}</p>}
     
    </div>
  );
};
export default ChangePassword;