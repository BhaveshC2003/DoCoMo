import axios from "axios"

//Getting committees of user
export const getUserCommittees = async(dispatch)=>{
    try{
        dispatch({type:"GET_COMMITTEES_REQUEST"})
        const {data} = await axios.get("http://localhost:9000/api/v1/committee/me",{withCredentials:true})
        dispatch({type:"GET_COMMITTEES_SUCCESS",payload:data.committees})
    }catch(err){
        dispatch({type:"GET_COMMITTEES_FAIL",payload:err.response.data.message})
    }
}

export const createCommittee = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"CREATE_COMMITTEE_REQUEST"})
        const {data} = await axios.post("http://localhost:9000/api/v1/committee/create",details,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true})
        dispatch({type:"CREATE_COMMITTEE_SUCCESS",payload:data.committees})
    }catch(err){
        dispatch({type:"CREATE_COMMITTEE_FAIL",payload:err.response?.data?.message})
    }
}

//Getting all committees
export const getCommittees = (committees)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_COMMITTEES_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/committee?names=${committees}`,{withCredentials:true})
        dispatch({type:"GET_COMMITTEES_SUCCESS",payload:data.committees})
    }catch(err){
        dispatch({type:"GET_COMMITTEES_FAIL",payload:err.response?.data?.message})
    }
}

//Getting committee details
export const getCommitteeDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_COMMITTEE_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/committee/${id}`,{withCredentials:true})
        dispatch({type:"GET_COMMITTEE_SUCCESS",payload:data})
    }catch(err){
        dispatch({type:"GET_COMMITTEE_FAIL",payload:err.response?.data?.message})
    }
}