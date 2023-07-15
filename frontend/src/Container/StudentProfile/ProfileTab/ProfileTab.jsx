import {React,useEffect} from 'react'
import "./ProfileTab.css"
import { useSelector,useDispatch } from 'react-redux'
import Loading from "../../Loading/Loading"
import {Avatar} from "@material-ui/core"

const ProfileTab = () => {
    const {loading,error,user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
  return (
    loading ? <Loading /> :
    <div className='cp__student-profile-about'>
        <div className='cp__student-profile-img'>
            <Avatar src={user.avatar.url} style={{height:"100%",width:"8%"}} />
        </div>
        <div className='cp__student-profile-about-container'>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="name">Name: </label>
                    <p>{user.name}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="email">Email: </label>
                    <p>{user.email}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="phonenumber">Phone Number: </label>
                    <p>{user.phoneNumber}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="dob">Date Of Birth: </label>
                    <p>{user.DOB.slice(0,10)}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="gender">Gender: </label>
                    <p>{user.gender}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="department">Branch: </label>
                    <p>{user.branch}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="qualification">Year Of Study: </label>
                    <p>{user.yearOfStudy}</p>
                </div>
                <div className='cp__student-profile-about-field'>
                    <label htmlFor="about">UID: </label>
                    <p>{user.studentId}</p>
                </div>
            </div>
    </div>
  )
}

export default ProfileTab