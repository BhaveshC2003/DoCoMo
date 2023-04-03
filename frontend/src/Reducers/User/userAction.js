import axios from "axios"

export const registerUser = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"REGISTER_USER_REQUEST"})
        const {data} = await axios.post("http://localhost:9000/api/v1/register",details,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true})
        dispatch({type:"REGISTER_USER_SUCCESS",payload:data.user})
    }catch(err){
        console.log(err)
        dispatch({type:"REGISTER_USER_FAIL",payload:err.response?.data?.message})
    }
}

export const loginUser = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"LOGIN_USER_REQUEST"})
        const {data} = await axios.post("http://localhost:9000/api/v1/login",details,{headers:{"Content-Type":"application/json"},withCredentials:true})
        dispatch({type:"LOGIN_USER_SUCCESS",payload:data.user})
    }catch(err){
        dispatch({type:"LOGIN_USER_FAIL",payload:err.response?.data?.message})
    }
}

export const getUserDetails = async(dispatch)=>{
    try{
        dispatch({type:"GET_USER_REQUEST"})
        const {data} = await axios.get("http://localhost:9000/api/v1/me",{withCredentials:true})
        dispatch({type:"GET_USER_SUCCESS",payload:data.user})
    }catch(err){
        dispatch({type:"GET_USER_FAIL",payload:err.response?.data?.message})
    }
}

export const logoutUser = async(dispatch)=>{
    try{
        dispatch({type:"LOGOUT_USER_REQUEST"})
        const {data} = await axios.get("http://localhost:9000/api/v1/logout",{withCredentials:true})
        dispatch({type:"LOGOUT_USER_SUCCESS",payload:data.message})
    }catch(err){
        dispatch({type:"LOGOUT_USER_FAIL",payload:err.response?.data?.message})
    }
}