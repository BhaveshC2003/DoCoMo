import {React,useState} from 'react'
import ProfileTab from './ProfileTab/ProfileTab'
import "./StudentProfile.css"

const options = ["Profile"]

const StudentProfile = () => {
    const [activeOption,setActiveOption] = useState(0)
  return (
    <div className='cp__student-profile cp__margin-navbar'>
        <div className='cp__student-profile-container'>
            <ul className='cp__student-profile-options'>
                {
                    options.map((op,i)=><li key={i} 
                    className={activeOption === i ? "cp__student-profile-options-active" : ""}
                    onClick={()=>setActiveOption(i)} >
                    {op}</li>)
                }
            </ul>
            <div className='cp__student-profile-details cp__padding'>
                {
                    activeOption === 0 && <ProfileTab />
                }
            </div>
        </div>
    </div>
  )
}

export default StudentProfile