import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch } from 'react-redux'
import "./Navbar.css"
import { logoutUser } from '../../../Reducers/User/userAction'

const Navbar = () => {
  const {user,isAuthenticated} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [showProfile,setShowProfile] = useState(false)
  return (
    <div className='cp__navbar'>
        <div className='cp__navbar-left'> 
            <h2>DoCoMo</h2>
        </div>
        <div className='cp__navbar-middle'>
            <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/events"}>Events</Link></li>
              <li><Link to={"/committees"}>Committees</Link></li>
              <li><Link to={"/courses"}>Courses</Link></li>
              {user &&   user.role === "student" && <li><Link to={"/assignments"}>My Assignments</Link></li>}
              <li><Link to={"/studymaterials"} >Study Material</Link></li>
            </ul>
        </div>
        <div className='cp__navbar-right'>
            {
              isAuthenticated ? 
              <div className='cp__navbar-profile'>
                  <div className='cp__navbar-profile-img' onClick={()=>setShowProfile(!showProfile)}>
                      <img src={user.avatar.url} alt="Profile" />
                  </div>
                  {
                    showProfile && 
                    <div className='cp__navbar-profile-container'>
                        <Link to={`/${user.role}/profile`}>My Profile</Link>
                        <Link>Reset Password</Link>
                        <Link onClick={()=>dispatch(logoutUser)}>Logout</Link>
                    </div>
                  }
              </div>
              :
              <div>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Sign Up</Link>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar