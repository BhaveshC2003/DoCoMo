import {React,useEffect} from 'react'
import "./Assignments.css"
import {useSelector,useDispatch} from "react-redux"
import { getAssignments,getStudentAssignments } from '../../Reducers/Assignment/assignmentAction'
import Assignment from "../../Components/Assignment/Assignment"
import Loading from "../Loading/Loading"
import { useParams,useSearchParams } from 'react-router-dom'

const Assignments = ({role}) => {
    const {loading,error,assignments,submissions} = useSelector(state=>state.assignment)
    const {id} = useParams()
    const [searchParams,setSearchParams] = useSearchParams()
    const courseId = searchParams.get("course")
    const dispatch = useDispatch()
    useEffect(()=>{
        if(role === "student")
            dispatch(getAssignments({}))
        if(role === "teacher")
            dispatch(getStudentAssignments({studentId:id,courseId:courseId}))
    },[dispatch,id,courseId,role])
  return (
    loading ? <Loading /> :
    <div className='cp__assignments cp__margin-navbar cp__padding'>
        <div className='cp__assignment-filter'>

        </div>
        <div className='cp__assignment-container cp__padding'>
            <h1>Assignments</h1>
            {
                assignments?.map((a,i)=><Assignment key={i} submission={submissions[i]} assignment={a} />)
            }
        </div>
    </div>
  )
}

export default Assignments