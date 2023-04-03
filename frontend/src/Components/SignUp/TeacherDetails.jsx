import {React,useEffect,useReducer} from 'react'
import "./TeacherDetails.css"
import {default as profile} from "../../static/media/extra/profile.jpg"
import Tags from '../Tags/Tags'
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from "../../Reducers/User/userAction"
import Loading from '../../Container/Loading/Loading'
import { useAlert } from 'react-alert'

const TeacherDetails = ({handleNext}) => {
    const reduxDispatch =  useDispatch()
    const {loading,error,success} = useSelector(state=>state.user)
    const alert = useAlert()
    const reducer = (state,{type,payload})=>{
        switch(type){
            case "avatar":
                return {...state,avatar:payload}
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
            case "department":
                return {...state,department:payload}
            case "qualification":
                return {...state,qualification:payload}
            case "about":
                return {...state,about:payload}
            case "addTag":
                return {...state,subjects:[...state.subjects,payload]}
            case "removeTag":
                const subjects = state.subjects.filter(sub=>sub !== payload ? true : false)
                return {...state,subjects}
            case "reset":
                return {subjects:[],role:"teacher"}
            default:
                return state
        }
    }
    const [details,dispatch] = useReducer(reducer,{subjects:[],role:"teacher",avatar:profile,gender:"Male",department:"CS"})
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
    const subjects = ["Linear Algebra","Computer Networks","DSA","Probability","OS","Communication Skills",
    "Machine Learning","Cloud Computing","DSGT","CAO"]

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
    <form className='cp__signup-teacher' encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className='cp__signup-teacher-container cp__padding'>
            <h1>Register As Teacher</h1>
            <div className='cp__signup-teacher-avatar'>
                <p>Avatar</p>
                <img src={details.avatar} alt="Avatar" />
                <input type="file" accept="image/*" onChange={handleImage}/>
            </div>
            <div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="name">Name</label>
                    <input value={details.name} id='name' type="text" onChange={(e)=>dispatch({type:"name",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="email">Email</label>
                    <input value={details.email} id='email' type="email" onChange={(e)=>dispatch({type:"email",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="password">Password</label>
                    <input value={details.password} id="password" type="password" onChange={(e)=>dispatch({type:"password",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input value={details.phoneNumber} id="phonenumber" type="text" onChange={(e)=>dispatch({type:"phoneNumber",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="dob">Date Of Birth</label>
                    <input value={details.DOB} id="dob" type="date" onChange={(e)=>dispatch({type:"DOB",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="gender">Gender</label>
                    <select value={details.gender} id='gender' onChange={(e)=>{console.log(e.target.value); dispatch({type:"gender",payload:e.target.value})}}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="department">Department</label>
                    <select value={details.department} id='department' onChange={(e)=>dispatch({type:"department",payload:e.target.value})}>
                        <option value="CS">CS</option>
                        <option value="EXTC">EXTC</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="DS">DS</option>
                    </select>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="qualification">Qualification</label>
                    <input value={details.qualification} id="qualification" type="text" onChange={(e)=>dispatch({type:"qualification",payload:e.target.value})}/>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="about">About</label>
                    <textarea id="about" onChange={(e)=>dispatch({type:"about",payload:e.target.value})}></textarea>
                </div>
                <div className='cp__signup-teacher-input'>
                    <label htmlFor="subjects">Subjects</label>
                    <select id='subjects' onChange={(e)=>dispatch({type:"addTag",payload:e.target.value})}>
                        {
                            subjects.map((sub,i)=><option value={sub} key={sub}>{sub}</option>)
                        }
                    </select>
                </div>
                <div className='cp__signup-tags'>
                    {
                        details.subjects.map((sub,i)=><Tags name={sub} key={i} dispatch={dispatch}/>)
                    }
                </div>
            </div>
            <div className='cp__signup-btn'>
                <button type='submit'>Submit</button>
            </div>
        </div>
    </form>
  )
}

export default TeacherDetails