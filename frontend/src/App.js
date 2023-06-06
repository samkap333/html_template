import { Routes, Route } from 'react-router-dom';
import { useEffect , useState } from 'react';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AuthLayout from './components/Layouts/AuthLayout';
import PanelLayout from './components/Layouts/PanelLayout';
import LoanOffer from './pages/LoanOffer.js';
import LoanActivity from './pages/LoanActivity.js';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import SocialPost from './pages/SocialPost.js';
import ViewPost from './pages/ViewPost';
import ForgotPassword from './pages/ForgotPassword';
import EnterOtp from './pages/EnterOtp';
import ChangePassword from './pages/ChangePassword';
import MobileOtp from './pages/MobileOtp';
import ForgotwithEmail from './pages/ForgotwithEmail';





function App() {
 
const [userTypeState , setUserTypeState] = useState('')

  let userType ;

  useEffect(() => {
      userType = localStorage.getItem('loggedInUserRole');
   
     

      
      

      
      //alert( userType)
      setUserTypeState(userType)
  }, []);
  

  
  
  

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route path="/" element={<SignIn/>} />
          <Route path="/login" element={<SignIn/>} />

          <Route path="/register" element={<SignUp />} />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<EnterOtp />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/mobileverify" element={<MobileOtp />} />
          <Route path="/emailverify" element={<ForgotwithEmail />} />
         
        </Route>

        


        {userTypeState && userTypeState ==='admin' ? 

        
        <Route path="/" element={<PanelLayout />}>
       
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/loanoffer" element={<LoanOffer />} />
            <Route path="/loanactivity" element={<LoanActivity />} /> 
            <Route path="/users" element={<Users />} />
            <Route path="/post" element={<SocialPost />} />
            <Route path="/viewpost" element={<ViewPost />} />
 

          </Route>
         :
          <Route path="/" element={<PanelLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loanactivity" element={<LoanActivity />} /> 
          <Route path="/loanoffer" element={<LoanOffer />} />
          <Route path="/post" element={<SocialPost />} />
          <Route path="/viewpost" element={<ViewPost />} />

          <Route path="*" element={<PageNotFound />} />
        
          
        </Route>}

        
      </Routes>
    </>
  );
}

export default App;
