import {React,useState,useEffect} from 'react'
import "./CreateEvent.css"
import {RxCross2} from "react-icons/rx"
import {useDispatch,useSelector} from "react-redux"
import { createEvent } from '../../Reducers/Event/eventAction'
import Loading from "../../Container/Loading/Loading"
import {useAlert} from "react-alert"

const categories = ["Hackathon","Case Study","Sports","E-Sports","Coding"]

const CreateEvent = ({setShowCreateEvent,committee}) => {
    const {loading,error,success} = useSelector(state=>state.event)
    const dispatch = useDispatch(0)
    const [name,setName] = useState("")
    const [category,setCategory] = useState("")
    const [dueDate,setDueDate] = useState()
    const [eventDate,setEventDate] = useState()
    const [image,setImage] = useState(null)
    const [link,setLink] = useState("")
    const [description,setDescription] = useState("Details will be uploaded soon.")
    const alert = useAlert()
    const handleImage = (e)=>{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setImage(reader.result)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(createEvent({name,category,dueDate,eventDate,image,link,committee,description}))
    }
    useEffect(()=>{
        if(success){
            alert.success("Event Created")
            dispatch({type:"RESET_SUCCESS_EVENT"})
            setShowCreateEvent(false)
        }
    },[error,success,setShowCreateEvent,dispatch,alert])
  return (
    loading ? <Loading /> :
    <form className='cp__create-event' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='cp__create-event-container'>
            <RxCross2 color='white' size={35} style={{position:"absolute",right:"10px",top:"10px"}} 
            onClick={()=>setShowCreateEvent(false)} cursor="pointer"/>
            <h2>Event Details</h2>
            <div>
                <label htmlFor="image">Event Image</label>
                <input required id='image' type="file" accept='image/*' onChange={handleImage}/>
            </div>
            <div className='cp__create-event-inputs'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select name="" id="category" onChange={(e)=>setCategory(e.target.value)}>
                        {
                            categories.map(cat=><option value={cat} key={cat}>{cat}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="duedate">Due Date</label>
                    <input type="date" id='duedate'onChange={(e)=>setDueDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="eventdate">Event Date</label>
                    <input id='eventdate' type="date" onChange={(e)=>setEventDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="link">About</label>
                    <textarea rows={5} cols={400} type="text"  id='link'onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="link">Registration Link</label>
                    <input type="text"  id='link'onChange={(e)=>setLink(e.target.value)}/>
                </div>
            </div>
            <button type='submit' className='cp__btn'>CREATE</button>
        </div>
    </form>
  )
}

export default CreateEvent