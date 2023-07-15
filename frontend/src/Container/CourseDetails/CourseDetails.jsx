import {React,useEffect,useState} from 'react'
import "./CourseDetails.css"
import Loading from "../Loading/Loading"
import {useParams} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { getCourseDetails, joinCourse } from '../../Reducers/Course/courseAction'
import {useAlert} from "react-alert"
import CreateAssignment from '../../Components/CreateAssignment/CreateAssignment'
import CourseAssignments from './CourseAssignments'
import CourseStudents from './CourseStudents'

const CourseDetails = () => {
    const {id} = useParams()
    const {loading,error,courseDetails,enrolled,assignments,submissions} = useSelector(state=>state.course)
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const alert = useAlert()
    const [showCreateAssignment,setShowCreateAssignment] = useState(false)
    const [key,setKey] = useState("")
    const handleJoin = (e)=>{
        dispatch(joinCourse(key,id))
    }
    useEffect(()=>{
        if(error)
            alert.error(error)
        dispatch(getCourseDetails(id))
    },[dispatch,id,alert,error,enrolled])

  return (
    loading ? <Loading />:
    courseDetails && 
    <div className='cp__coursedetails cp__margin-navbar cp__padding'>
        <div className='cp__coursedetails-container cp__padding'>
            <div className='cp__coursedetails-up'>
                <div>
                    <img src={courseDetails.image?.url} alt="logo" />
                </div>
                <div>
                    <h2>{courseDetails.name}</h2>
                    {
                        enrolled && <p>(Already Enrolled)</p>
                    }
                    <div>
                        <label htmlFor="">Created By</label>
                        <p>{courseDetails.teacher?.name}</p>
                    </div>
                    <div>
                     <label htmlFor="">Branch</label>
                     <p>{courseDetails.branch}</p>
                    </div>
                    <div className='cp__coursedetails-btn'>
                        {
                            user.role === "student" && !enrolled && 
                            <div>
                                <input type="text" placeholder='Enter Course Key' value={key} onChange={(e)=>setKey(e.target.value)}/>
                                <button className='cp__btn' onClick={handleJoin}>JOIN</button>
                            </div>
                            
                        }
                        {
                            user.role === "teacher" && 
                            <button className='cp__btn' onClick={()=>setShowCreateAssignment(true)}>
                                Create Assignment
                            </button>
                        }
                    </div>
                </div>
            </div>
            {
                user.role === "student" && <CourseAssignments assignments={assignments} enrolled={enrolled} submissions={submissions} />
            }
            {
                user.role === "teacher" && <CourseStudents students={courseDetails.students} courseId={courseDetails._id.toString()} />
            }

        </div>
        {
            showCreateAssignment && <CreateAssignment courseId={id} setShowCreateAssignment={setShowCreateAssignment} />
        }
    </div>
  )
}

export default CourseDetails