import {React,useState} from 'react'
import Committees from './Committees/Committees'
import Courses from './Courses/Courses'
import ProfileTab from './ProfileTab/ProfileTab'
import StudyMaterial from './StudyMaterial/StudyMaterial'
import "./TeacherProfile.css"

const TeacherProfile = () => {
    const options = ["Profile","My Courses","My Committees","Study Materials"]
    const [activeOption,setActiveOption] = useState(0)
  return (
    <div className='cp__teacher-profile cp__margin-navbar'>
        <div className='cp__teacher-profile-container'>
            <ul className='cp__teacher-profile-options'>
                {
                    options.map((op,i)=><li key={i} 
                    className={activeOption === i ? "cp__teacher-profile-options-active" : ""}
                    onClick={()=>setActiveOption(i)} >
                    {op}</li>)
                }
            </ul>
            <div className='cp__teacher-profile-details cp__padding'>
                {
                    activeOption === 0 && <ProfileTab />
                }
                {
                    activeOption === 1 && <Courses />
                }
                {
                    activeOption === 2 && <Committees />
                }{
                    activeOption == 3 && <StudyMaterial />
                }
            </div>
        </div>
    </div>
  )
}

export default TeacherProfile