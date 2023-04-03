import {React,useState,useEffect} from 'react'
import "./Login.css"
import {useDispatch,useSelector} from "react-redux"
import { loginUser } from '../../Reducers/User/userAction'
import {useAlert} from "react-alert"
import {useNavigate} from "react-router-dom"
import Loading from "../Loading/Loading"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("student")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,error,loading} = useSelector(state=>state.user)
    const alert = useAlert()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const details = {email,password,role}
        dispatch(loginUser(details))
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(isAuthenticated){
            navigate("/")
        }
    },[dispatch,error,isAuthenticated,alert,navigate])
  return (
    loading === true ? <Loading />:
    <form className='cp__login cp__margin-navbar' onSubmit={handleSubmit}>
        <div className='cp__login-container'>
            <h1>LOGIN</h1>
            <div className='cp__login-input-container'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={email} id='email' type="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} id='password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select value={role} id="role" onChange={(e)=>setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
            </div>
            <button className='cp__btn' type='submit'>LOGIN</button>
        </div>
    </form>
  )
}

export default Login