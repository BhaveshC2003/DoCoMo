import {React,useEffect} from 'react'
import "./EventDetails.css"
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getEventDetails } from '../../Reducers/Event/eventAction'
import Loading from "../Loading/Loading"

const EventDetails = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {loading,error,event} = useSelector(state=>state.event)

  useEffect(()=>{
    dispatch(getEventDetails(id))
  },[dispatch,id])
  return (
    loading ? <Loading /> :
    event && <div className='cp__eventdetails cp__padding cp__margin-navbar'>
    <div className='cp__eventdetails-container cp__padding'>
         <div className='cp__eventdetails-up'>
             <div>
                 <img src={event.image.url} alt="logo" />
             </div>
             <div>
                 <h2>{event.name}</h2>
                 <div>
                     <label htmlFor="">Hosted By</label>
                     <p>{event.committee.name}</p>
                 </div>
                 <div>
                     <label htmlFor="">Event Date</label>
                     <p>{event.eventDate.split("T")[0]}</p>
                 </div>
                 <div>
                     <label htmlFor="">Category</label>
                     <p>{event.category}</p>
                 </div>
                 <div className='cp__eventdetails-btn'>
                     {
                      <button className='cp__btn' onClick={()=>window.open(event.link,"_blank")}>Register</button>
                     }
                 </div>
             </div>
         </div>
         <div className='cp__eventdetails-middle'>
             <h1>ABOUT</h1>
             <p>
                 {event.description}
             </p>
         </div>
    </div>
 </div>
  )
}

export default EventDetails