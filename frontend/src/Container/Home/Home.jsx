import {React, useEffect} from 'react'
import "./Home.css"
import {default as header} from "../../static/media/header.jpg"
import About from '../../Components/About/About'
import {default as hackathon} from "../../static/media/Events/hackathon.png"
import {default as sample} from "../../static/media/Events/sample.jpeg"
import {default as ml} from "../../static/media/Courses/ml.jpg"
import {default as study} from "../../static/media/Study/study.jpg"
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getCommittees } from '../../Reducers/Committee/committeeAction'
import Loading from '../Loading/Loading'
import { getEvent } from '../../Reducers/Event/eventAction'
import { getCourses } from '../../Reducers/Course/courseAction'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading:committeeLoading,error,committees} = useSelector(state=>state.committee)
    const {loading:eventLoading,events} = useSelector(s=>s.event)
    const {loading:courseLoading,courses} = useSelector(s=>s.course)
    useEffect(()=>{
        dispatch(getCommittees(JSON.stringify([])))
        dispatch(getEvent({categories:JSON.stringify([]),committees:JSON.stringify([]),date:""}))
        dispatch(getCourses())
    },[dispatch])
  return (
    <div className='cp__home cp__margin-navbar cp__padding'>
        <div className='cp__home-header cp__margin'>
            <h1>Welcome To DoCoMo</h1>
            <div className='cp__home-header-container'>
                <div className='cp__home-header-left'>
                    <p>
                        Welcome to DoCoMo, the premier student college portal designed 
                        to cater to all your academic and extracurricular needs.
                        Whether you're a student seeking information on upcoming events,
                        committees, joining courses, or submitting assignments, DoCoMo is 
                        here to streamline your college experience and keep you connected with 
                        the vibrant campus community.
                        Experience the power of seamless integration between academic resources 
                        and student life by joining DoCoMo today. Empowering you to make the most 
                        of your college experience, DoCoMo is your go-to companion for academic 
                        success, community engagement, and personal growth.
                    </p>
                </div>
                <div className='cp__home-header-right'>
                    <div className='cp__home-header-right-img'>
                        <img src={header} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <About path={"events"} loading={eventLoading} title={"UPCOMING EVENTS"} array={events} />
        <About path={"committees"} loading={committeeLoading} title={"COMMITTEES"} array={committees} />
        <About path={"courses"} loading={courseLoading} title={"COURSES"} array={courses} />
        <div className='cp__home-study-material cp__margin cp__padding'>
            <div className='cp__home-study-material-left'>
                <h2>Having Trouble Finding Reference?</h2>
                <p>
                    Stop wasting your time in finding the references or study materials.
                    All the required study materials are uploaded by the teachers which can 
                    be viewed in <b style={{textDecoration:"underline",fontWeight:"400"}} >Study Materials</b> section.
                </p>
                <button onClick={()=>navigate("/studymaterials")} >EXPLORE</button>
            </div>
            <div className='cp__home-study-material-right'>
                <div>
                    <img src={study} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home