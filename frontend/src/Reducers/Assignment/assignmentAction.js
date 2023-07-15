import axios from "axios"

export const createAssignment = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"CREATE_ASSIGNMENT_REQUEST"})
        const {data} = await axios.post("http://localhost:9000/api/v1/assignment/teacher",details,
        {headers:{"Content-Type":"application/json"},withCredentials:true})
        dispatch({type:"CREATE_ASSIGNMENT_SUCCESS",payload:data.message})
    }catch(err){
        dispatch({ype:"CREATE_ASSIGNMENT_FAIL",payload:err.response.data?.message})
    }
}

export const uploadAssignment = (file,id)=>async(dispatch)=>{
    try{
        dispatch({type:"UPLOAD_ASSIGNMENT_REQUEST"})
        const {data} = await axios.post(`http://localhost:9000/api/v1/assignment/student/${id}`,{file},
        {headers:{"Content-Type":"multipart/form-data"},withCredentials:true})
        dispatch({type:"UPLOAD_ASSIGNMENT_SUCCESS",payload:data.message})
    }catch(err){
        console.log(err)
        dispatch({type:"UPLOAD_ASSIGNMENT_FAIL",payload:err.response.data?.message})
    }
}

//Getting all assignments --Student
export const getAssignments = (filter)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_ASSIGNMENT_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/assignment`,
        {headers:{"Content-Type":"application/json"},withCredentials:true})
        dispatch({type:"GET_ASSIGNMENT_SUCCESS",payload:{assignments:data.assignments,submissions:data.submissions}})
    }catch(err){
        console.log(err)
        dispatch({type:"GET_ASSIGNMENT_FAIL",payload:err.response.data?.message})
    }
}

//Getting students assignment for specific course
export const getStudentAssignments = ({studentId,courseId})=>async(dispatch)=>{
    try{
        dispatch({type:"GET_ASSIGNMENT_REQUEST"})
        const {data} = await axios.get(`http://localhost:9000/api/v1/assignment/${courseId}?student=${studentId}`,
        {headers:{"Content-Type":"application/json"},withCredentials:true})
        dispatch({type:"GET_ASSIGNMENT_SUCCESS",payload:{assignments:data.assignments,submissions:data.submissions}})
    }catch(err){
        console.log(err)
        dispatch({type:"GET_ASSIGNMENT_FAIL",payload:err.response.data?.message})
    }
}

//Grading student --Teacher
export const gradeStudent = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"GRADE_STUDENT_SUCCESS"})
        const {data} = await axios.put("http://localhost:9000/api/v1/assignment/teacher/grade",details,
        {headers:{"Content-Type":"application/json"},withCredentials:true})
        dispatch({type:"GRADE_STUDENT_SUCCESS",payload:data.message})
    }catch(err){
        dispatch({type:"GRADE_STUDENT_FAIL",payload:err.response.data?.message})
    }
}