import React from 'react'
import "./ProfileTab.css"
import {useSelector} from "react-redux"
import {Avatar} from "@material-ui/core"
import Tags from "../../../Components/Tags/Tags"

const ProfileTab = () => {
    const {user} = useSelector(state=>state.user)
  return (
    <div className='cp__teacher-profile-about'>
        <div className='cp__teacher-profile-img'>
            <Avatar src={user.avatar.url} style={{height:"100%",width:"8%"}} />
        </div>
        <div className='cp__teacher-profile-about-container'>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="name">Name: </label>
                    <p>{user.name}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="email">Email: </label>
                    <p>{user.email}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="phonenumber">Phone Number: </label>
                    <p>{user.phoneNumber}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="dob">Date Of Birth: </label>
                    <p>{user.DOB.slice(0,10)}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="gender">Gender: </label>
                    <p>{user.gender}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="department">Department: </label>
                    <p>{user.department}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="qualification">Qualification: </label>
                    <p>{user.qualification}</p>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="subjects">Subjects: </label>
                    <div className='cp__profile-tags'>
                    {
                        user.subjects.map((sub,i)=><Tags name={sub}/>)
                    }
                </div>
                </div>
                <div className='cp__teacher-profile-about-field'>
                    <label htmlFor="about">About: </label>
                    <p>{user.about}</p>
                </div>
            </div>
    </div>
  )
}

export default ProfileTab