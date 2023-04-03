import {React,useEffect,useReducer} from 'react'
import "./StudentDetails.css"
import {default as profile} from "../../static/media/extra/profile.jpg"
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from "../../Reducers/User/userAction"
import Loading from '../../Container/Loading/Loading'
import { useAlert } from 'react-alert'

const StudentDetails = ({handleNext}) => {
  const reduxDispatch =  useDispatch()
    const {loading,error,success} = useSelector(state=>state.user)
    const alert = useAlert()
    const reducer = (state,{type,payload})=>{
        switch(type){
            case "avatar":
                return{...state,avatar:payload}
            case "name":
                return {...state,name:payload}
            case "email":
                return {...state,email:payload}
            case "password":
                 return {...state,password:payload}
            case "phoneNumber":
                 return {...state,phoneNumber:payload}
            case "DOB":
                return {...state,DOB:payload}
            case "gender":
                return {...state,gender:payload}
            case "branch":
                return {...state,branch:payload}
            case "studentid":
                return {...state,studentId:payload}
            case "yearofstudy":
                return {...state,yearOfStudy:payload}
            case "addTag":
                return {...state,subjects:[...state.subjects,payload]}
            case "removeTag":
                const subjects = state.subjects.filter(sub=>sub !== payload ? true : false)
                return {...state,subjects}
            case "reset":
                return {subjects:[],role:"student"}
            default:
                return state
        }
    }
    const [details,dispatch] = useReducer(reducer,{subjects:[],role:"student",avatar:profile,gender:"Male"})
    const handleImage = (e)=>{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            dispatch({type:"avatar",payload:reader.result})
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        reduxDispatch(registerUser(details))
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(success){
            dispatch({type:"reset"})
            reduxDispatch({type:"RESET_SUCCESS"})
            handleNext()
        }
    },[error,success,handleNext,reduxDispatch,dispatch,alert])

  return (
    loading === true ? <Loading /> :
    <form className='cp__signup-student' encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className='cp__signup-student-container cp__padding'>
            <h1>Register As Student</h1>
            <div className='cp__signup-student-avatar'>
                <p>Avatar</p>
                <img src={details.avatar} alt="Avatar" />
                <input type="file" accept="image/*" onChange={handleImage}/>
            </div>
            <div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" onChange={(e)=>dispatch({type:"name",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" onChange={(e)=>dispatch({type:"email",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={(e)=>dispatch({type:"password",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input id="phonenumber" type="text" onChange={(e)=>dispatch({type:"phoneNumber",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="dob">Date Of Birth</label>
                    <input id="dob" type="date" onChange={(e)=>dispatch({type:"DOB",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="gender">Gender</label>
                    <select id='gender' onChange={(e)=>{console.log(e.target.value); dispatch({type:"gender",payload:e.target.value})}}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="studentid">Student ID</label>
                    <input id="studentid" type="text" onChange={(e)=>dispatch({type:"studentid",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="branch">Branch</label>
                    <select id='branch' onChange={(e)=>dispatch({type:"branch",payload:e.target.value})}>
                        <option value="CS">CS</option>
                        <option value="EXTC">EXTC</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="DS">DS</option>
                    </select>
                </div>
                <div className='cp__signup-student-input'>
                    <label htmlFor="yearofstudy">Year Of Study</label>
                    <select id='yearofstudy' onChange={(e)=>dispatch({type:"yearofstudy",payload:e.target.value})}>
                        <option value="First">First</option>
                        <option value="Second">Second</option>
                        <option value="Third">Third</option>
                        <option value="Fourth">Fourth</option>
                    </select>
                </div>
            </div>
            <div className='cp__signup-btn'>
                <button type='submit'>Submit</button>
            </div>
        </div>
    </form>
  )
}

export default StudentDetails