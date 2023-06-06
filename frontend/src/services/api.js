import axios from 'axios'
import { baseUrl } from '../components/constant'

console.log(baseUrl);

const axiosInstance = axios.create({
    
});

axiosInstance.defaults.baseURL = baseUrl;


const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    return headers;

}
export const registration = (data, userType) => {
    const url = '/register'
    return axiosInstance.post(url, { ...data, userType });
  };
  
  

export const Login = (data) => {
    return axiosInstance.post('/login', data, {
        headers: getHeaders()
    });
}




export const loanInfo=() =>{
    return axiosInstance.get('/loan-offers-info',{
        headers:getHeaders()
    });
}

export const addLoanoffer = (data) => {
    return axiosInstance.post('/add-loan-offer', data, {
        headers: getHeaders()
    });
}
export const deleteLoanoffer = (id) => {
    return axiosInstance.delete(`/delete-loanoffer/${id}`, {
        headers: getHeaders()
    });
}
export const updateLoanInfo = (id,data) => {
    console.log("data",data)
    return axiosInstance.post(`/update-loanoffer/${id}`,data, {
        headers: getHeaders()
    });
}

export const userInfo=() =>{
    return axiosInstance.get('/user-info',{
        headers:getHeaders()
    });
}
export const addNewUser = (data) => {
    return axiosInstance.post('/add-new-user', data, {
        headers: getHeaders()
    });
}
export const deleteUser = (id) => {
    return axiosInstance.delete(`/delete-user/${id}`, {
        headers: getHeaders()
    });
}
export const updateUserInfo = (id,data) => {
    return axiosInstance.post(`/update-user-info/${id}`,data, {
        headers: getHeaders()
    });
}
export const UserLogin = (data) => {
    return axiosInstance.post('/user-login', data, {
        headers: getHeaders()
    });

}

export const UserDetails=() =>{
    return axiosInstance.get(`/check-user`,{
        headers:getHeaders()
    });
}
export const addPost = (data) => {
    return axiosInstance.post('/add-post', data, {
        headers: getHeaders()
    });
}

export const postInfo=() =>{
    return axiosInstance.get('/post-info',{
        headers:getHeaders()
    });
}
export const updatePost = (id,data) => {
    console.log('data',data)
    return axiosInstance.post(`/update-post/${id}`,data, {
        headers: getHeaders()
    });
}
export const sendOtp = (email) => {
    return axiosInstance.post('/sendotp', { email })
  };
  export const sendMobileOtp = (data) => {
    return axiosInstance.post('/send-mobile-otp',data)
  };

  export const verifyOtp = async (data) => {

    return axiosInstance.post('/verify-otp',data)
  };


  export const changePassword=(data)=>{
    return axiosInstance.post('/change-password',data)
}