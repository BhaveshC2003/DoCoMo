import {React,useState,useEffect} from 'react'
import "./Assignment.css"
import { useDispatch,useSelector } from 'react-redux'
import { gradeStudent, uploadAssignment } from '../../Reducers/Assignment/assignmentAction'
import {AiFillEye} from "react-icons/ai"
import { useAlert } from 'react-alert'

const Assignment = ({assignment,submission}) => {
    const {user} = useSelector(state=>state.user)
    const {loading,success,error,message} = useSelector(state=>state.assignment)
    const dispatch = useDispatch()
    const [file,setFile] = useState(null)
    const [grade,setGrade] = useState("")
    const alert = useAlert()
    const handleUpload = (e)=>{
        e.preventDefault()
        if(user.role === "student"){
            dispatch(uploadAssignment(file,assignment._id))
        }
        if(user.role === "teacher")
            dispatch(gradeStudent({id:assignment._id,grade,student:submission.student}))
    }
    useEffect(()=>{
        if(success){
            alert.success(message)
            dispatch({type:"RESET_MESSAGE"})
        }
    },[success])
  return (
    <div className='cp__assignment'>
        <div className='cp__assignment-left'>
            <h2>
                {assignment.name}
            </h2>
            <div className='cp__assignment-details'>
                <b>Created At: </b>
                <p>{assignment.createdAt.split("T")[0]}</p>
            </div>
            <div className='cp__assignment-details'>
                <b>Due Date: </b>
                <p>{assignment.dueDate.split("T")[0]}</p>
            </div>
            {submission && <AiFillEye cursor={"pointer"} color='white' size={25} onClick={()=>window.open(submission.link,"_blank")}/>}
        </div>
        <div className='cp__assignment-right'>
            <div className='cp__assignment-details'>
                <b>Submitted At:</b>
                <p>{
                    submission ? submission.submittedAt.split("T")[0] : "-"
                }</p>
            </div>
            <div className='cp__assignment-details'>
                <b>Grade Status:</b>
                <p>{
                    submission ? submission.gradeStatus === true ? "Graded" : "Not Graded" : "-"
                }</p>
            </div>
            <div className='cp__assignment-details'>
                <b>Grade</b>
                <p>{
                     submission ? submission.grade : "-"    
                }</p>
            </div>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                 {user.role === "student" && <input accept='application/pdf' name='file' required type="file" onChange={(e)=>setFile(e.target.files[0])} />}
                 {
                     submission && user.role === "teacher" && <input placeholder='Enter Grade' required onChange={(e)=>setGrade(Number(e.target.value))} value={grade}/>
                 }
                <button type='submit'>{ loading ? "Uploading" : user.role === "student" ? "Upload" : "Grade"}</button>
            </form>
        </div>
    </div>
  )
}

export default Assignment