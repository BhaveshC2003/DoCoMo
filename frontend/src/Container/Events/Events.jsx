import {React,useState,useEffect} from 'react'
import "./Events.css"
import {StaticDatePicker} from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { Checkbox, FormControlLabel,FormGroup } from '@material-ui/core'
import Box from "../../Components/Box/Box"
import {useDispatch,useSelector} from "react-redux"
import { getEvent } from '../../Reducers/Event/eventAction'
import Loading from "../Loading/Loading"

const Events = () => {
    const {events,loading,error} = useSelector(state=>state.event)
    const dispatch = useDispatch()
    const [category,setCategory] = useState([])
    const [committee,setCommittee] = useState([])
    const [date,setDate] = useState(null)
    const categories = ["Hackathon","Mun's","Case Study","Presentation","Speakers Conclave","Cultural Event"]
    const committees = ["CSI","E-Cell","Spark","Enactus","Mudra","IEEE"]
    const checkboxStyle = {
        color:"white",
        fontFamily:"Alkatra",
        fontSize:"2vmax"
    }
    const handleCategories = (e)=>{
        if(e.target.checked){
            setCategory(prev=>[...prev,e.target.value])
        }else{
            const arr = category.filter((x)=>x !== e.target.value )
            setCategory(arr)
        }
    }
    const handleCommittees = (e)=>{
        if(e.target.checked){
            setCommittee(prev=>[...prev,e.target.value])
        }else{
            const newArr = committee.filter(x=>x !== e.target.value)
            setCommittee(newArr)
        }
    }
    useEffect(()=>{
        if(error){
            console.log(error)
        }
        dispatch(getEvent({categories:JSON.stringify(category),committees:JSON.stringify(committee),date:date ? JSON.stringify(date) : ""}))
    },[dispatch,error,category,committee,date])
  return (
    loading ? <Loading /> : 
    <div className='cp__events cp__margin-navbar'>
        <form className='cp__events-left'>
            <h1>Apply Filters</h1>
            <div>
                <h3>Event Date</h3>
                <StaticDatePicker defaultValue={dayjs(date || Date.now())} className="cp__datepicker" 
                onChange={(value)=>setDate(value)} views={["day","month"]}/>
            </div>
            <h3>Categories</h3>
                <FormGroup className='cp__checkbox-container'>
                    {
                        categories.map((c,i)=><FormControlLabel control={<Checkbox value={c} style={checkboxStyle} 
                        onChange={handleCategories}/>} label={c} checked={category.includes(c)}/>)
                    }
                </FormGroup>
                <h3>Committees</h3>
                <FormGroup className='cp__checkbox-container'>
                    {
                        committees.map((c,i)=><FormControlLabel control={<Checkbox value={c} style={checkboxStyle}
                        checked={committee.includes(c)} onClick={handleCommittees} />} label={c} />)
                    }
                </FormGroup>
        </form>
        <div className='cp__events-right cp__margin'>
            <div className='cp__events-right-container cp__margin'>
               {
                   events && events.map((event,i)=><Box img={event.image?.url} name={event.name} id={event._id} />)
               }
            </div>
        </div>
    </div>
  )
}

export default Events