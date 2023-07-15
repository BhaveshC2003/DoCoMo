import {React,useState,useEffect} from 'react'
import "./CreateAssignment.css"
import {RxCross2} from "react-icons/rx"
import {useDispatch,useSelector} from "react-redux"
import Loading from "../../Container/Loading/Loading"
import {useAlert} from "react-alert"
import { createAssignment } from '../../Reducers/Assignment/assignmentAction'

const CreateAssignment = ({setShowCreateAssignment,courseId}) => {
    const {loading,error,message} = useSelector(state=>state.assignment)
    const [name,setName] = useState("")
    const [dueDate,setDueDate] = useState(null)
    const dispatch = useDispatch()
    const alert = useAlert()
    const handleSubmit = ()=>{
        dispatch(createAssignment({name,dueDate,courseId}))
    }

    useEffect(()=>{
        if(error)
            alert.error(error)
        if(message){
            alert.show(message)
            dispatch({type:"RESET_MESSAGE"})
            setShowCreateAssignment(false)
        }
    },[dispatch,error,alert,message,setShowCreateAssignment])
  return (
    <form className='cp__create-assignment'>
        <div className='cp__create-assignment-container'>
            <RxCross2 color='white' size={35} style={{position:"absolute",right:"10px",top:"10px"}} 
             onClick={()=>setShowCreateAssignment(false)} cursor="pointer"/>
            <h2>Assignment Details</h2>
            <div className='cp__create-assignment-inputs'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' required onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label htmlFor="duedate">Due Date</label>
                    <input type="date" id='duedate' required value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
                </div>
            </div>
            <button type='submit' className='cp__btn' onClick={handleSubmit}>CREATE</button>
        </div>
    </form>
  )
}

export default CreateAssignment