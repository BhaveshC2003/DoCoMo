import axios from "axios"

//Getting courses of a teacher
export const getTeacherCourses = (teacher)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_COURSES_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/course?teacher=${teacher}`)
        dispatch({type:"GET_COURSES_SUCCESS",payload:data.courses})
    }catch(err){
        dispatch({type:"GET_COURSES_FAIL",payload:err.response?.data?.message})
    }
}

//Creating a course 
export const addCourse = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"ADD_COURSE_REQUEST"})
        const config = {headers:{"Content-Type":"multipart/form-data"},withCredentials:true}
        const {data} = await axios.post("http://localhost:9000/api/v1/course",details,config)
        dispatch({type:"ADD_COURSE_SUCCESS",payload:data.message})
    }catch(err){
        dispatch({type:"ADD_COURSE_FAIL",payload:err.response?.data?.message})
    }
}

//Removing a course
export const removeCourse = (courseId)=>async(dispatch)=>{
    try{
        dispatch({type:"REMOVE_COURSE_REQUEST"})
        const {data} = await axios.delete(`http://localhost:9000/api/v1/course/${courseId}`,{withCredentials:true})
        dispatch({type:"REMOVE_COURSE_SUCCESS"})
    }catch(err){
        dispatch({type:"REMOVE_COURSE_FAIL",payload:err.response.data.message})
    }
}

//Getting all courses
export const getCourses = (name="",branch="")=>async(dispatch)=>{
    try{
        dispatch({type:"GET_COURSES_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/course?name=${name}&branch=${branch}`,{withCredentials:true})
        dispatch({type:"GET_COURSES_SUCCESS",payload:data.courses})
    }catch(err){
        dispatch({type:"GET_COURSES_FAIL",payload:err.response?.data?.message})
    }
}

//Getting course details
export const getCourseDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_COURSE_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/course/${id}`,{withCredentials:true})
        console.log(data.submissions)
        dispatch({type:"GET_COURSE_SUCCESS",payload:{courseDetails:data.course,enrolled:data.enrolled,assignments:data.assignments,submissions:data.submissions}})
    }catch(err){
        dispatch({type:"GET_COURSE_FAIL",payload:err.response?.data?.message})
    }
}

//Joining a course
export const joinCourse = (key,id)=>async(dispatch)=>{
    try{
        dispatch({type:"JOIN_COURSE_REQUEST"})
        const {data} = await axios.post(`http://localhost:9000/api/v1/course/${id}`,{key},{withCredentials:true})
        dispatch({type:"JOIN_COURSE_SUCCESS",payload:data.message})
    }catch(err){
        dispatch({type:"JOIN_COURSE_FAIL",payload:err.response?.data?.message})
    }
}