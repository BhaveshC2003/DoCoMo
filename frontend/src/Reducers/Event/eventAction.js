import axios from "axios"

//Creating event
export const createEvent = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"CREATE_EVENT_REQUEST"})
        await axios.post("http://localhost:9000/api/v1/event/create",details,{headers:{'Content-Type':"multipart/form-data"},withCredentials:true})
        dispatch({type:"CREATE_EVENT_SUCCESS"})
    }catch(err){
        dispatch({type:"CREATE_EVENT_FAIL",payload:err.response?.data?.message})
    }
}

//Getting event
export const getEvent = ({categories,committees,date})=>async(dispatch)=>{
    try{
        dispatch({type:"GET_EVENTS_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/event?categories=${categories}&committees=${committees}&date=${date}`,{withCredentials:true})
        dispatch({type:"GET_EVENTS_SUCCESS",payload:data.events})
    }catch(err){
        dispatch({type:"GET_EVENTS_FAIL",payload:err.response?.data?.message})
    }
}

//Getting event details
export const getEventDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_EVENTDETAILS_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/event/${id}`,{withCredentials:true})
        dispatch({type:"GET_EVENTDETAILS_SUCCESS",payload:data.event})
    }catch(err){
        dispatch({type:"GET_EVENTDETAILS_FAIL",payload:err.response.data?.message})
    }
}