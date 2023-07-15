import {React,useEffect,useState} from 'react'
import "./CommitteeDetails.css"
import {useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getCommitteeDetails } from '../../Reducers/Committee/committeeAction'
import Loading from "../Loading/Loading"
import CreateEvent from '../../Components/CreateEvent/CreateEvent'
import Members from '../../Components/Members/Members'

const CommitteeDetails = () => {
    const [showCreateEvent,setShowCreateEvent] = useState(false)
    const {id} = useParams()
    const {committee,loading,error,isAuthorized,members} = useSelector(state=>state.committee)
    const dispatch = useDispatch()

    useEffect(()=>{ 
        dispatch(getCommitteeDetails(id))
    },[dispatch,error,id])
  return (
    loading === true? <Loading /> :
    committee && 
    <div className='cp__committeedetails cp__padding cp__margin-navbar'>
    <div className='cp__committeedetails-container cp__padding'>
         <div className='cp__committeedetails-up'>
             <div>
                 <img src={committee.image.url} alt="logo" />
             </div>
             <div>
                 <h2>{committee.name}</h2>
                 <div>
                     <label htmlFor="">Created By</label>
                     <p>{committee.createdBy.name}</p>
                 </div>
                 <div>
                     <label htmlFor="">Total Members</label>
                     <p>20</p>
                 </div>
                 <div className='cp__committeedetails-btn'>
                     {
                         //!isAuthorized &&  <button className='cp__btn'>JOIN</button>
                     }
                     {
                         isAuthorized && <button className='cp__btn' onClick={()=>setShowCreateEvent(!showCreateEvent)}>Create Event</button>
                     }
                 </div>
             </div>
         </div>
         <div className='cp__committeedetails-middle'>
             <h1>ABOUT</h1>
             <p>
                 {
                     committee.description
                 }
             </p>
         </div>
         {
            showCreateEvent && <CreateEvent committee={id} setShowCreateEvent={setShowCreateEvent} />
        } 
        <div className='cp__committeedetails-bottom cp__margin'>
            <h1>Members</h1>
            <div className='cp__committeedetails-members'>
                <Members member={{avatar:committee.createdBy.avatar,name:committee.createdBy.name,status:"Active",role:"Committee Head"}} />
                {
                    members && members.map((m,i)=><Members member={{avatar:m.student.avatar,
                                name:m.student.name,status:m.status,role:m.role}} />)
                }
            </div>
        </div>  
    </div>
 </div>
  )
}

export default CommitteeDetails