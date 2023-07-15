import {React,useEffect,useState} from 'react'
import "./Courses.css"
import { Radio, FormControlLabel,RadioGroup } from '@material-ui/core'
import Box from "../../Components/Box/Box"
import {useDispatch,useSelector} from "react-redux"
import { getCourses } from '../../Reducers/Course/courseAction'
import Loading from "../Loading/Loading"

const branches = ["CS","IT","DS","AI/ML","EXTC","MCA"]
    const checkboxStyle = {
        color:"white",
        fontFamily:"Alkatra",
        fontSize:"2vmax"
    }

const Courses = () => {
    const {courses,loading,error} = useSelector(state=>state.course)
    const dispatch  = useDispatch()
    const [branch,setBranch] = useState("")
    const [name,setName] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(branch,name)
        dispatch(getCourses(name,branch))
        
    }
    useEffect(()=>{
        dispatch(getCourses(name,branch))
    },[dispatch])
  return (
    loading ? <Loading /> :
    <form className='cp__courses cp__margin-navbar' onSubmit={handleSubmit}>
        <div className='cp__courses-left'>
                <input type="text" placeholder='Search course name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <h3>Branch</h3>
                <RadioGroup className='cp__checkbox-container'
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                className="cp__checkbox-container"
                onChange={(e)=>setBranch(e.target.value)}
                value={branch}
                >
                    {
                        branches.map((b,i)=><FormControlLabel value={b} control={<Radio style={checkboxStyle}/>} label={b} style={{color:"white"}} />)
                    }
                </RadioGroup>
                <button type='submit' className='cp__btn'>Search</button>
        </div>
        <div className='cp__courses-right cp__margin'>
            <div className='cp__courses-right-container cp__margin'>
                {
                     courses && courses.map((c,i)=><Box key={i} img={c.image?.url} name={c.name} id={c._id}/>)

                }
            </div>
        </div>
    </form>
  )
}

export default Courses