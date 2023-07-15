import {React,useState,useEffect} from 'react'
import "./Courses.css"
import {RxCross2} from "react-icons/rx"
import {useSelector,useDispatch} from "react-redux"
import {getTeacherCourses,addCourse, removeCourse} from '../../../Reducers/Course/courseAction'
import {useAlert} from "react-alert"
import Loading from "../../Loading/Loading"

const Courses = () => {
    const {loading,error,success,courses} = useSelector(state=>state.course)
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const alert = useAlert()
    const [showAddCourse,setShowAddCourse] = useState(false)
    const [image,setImage] = useState(null)
    const [courseName,setCourseName] = useState("")
    const [key,setKey] = useState("")
    const [branch,setBranch] = useState("CS")
    const [link,setLink] = useState("")
    const [links,setLinks] = useState([])
    const handleAddCourse = (e)=>{
      e.preventDefault()
      const details = {name:courseName,key,branch,links,image}
      dispatch(addCourse(details))
    }
    const handleRemoveCourse = (courseId)=>{
      dispatch(removeCourse(courseId))
    }
    const handleImage = (e)=>{
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = ()=>{
        setImage(reader.result)
      }
    }

    useEffect(()=>{
      if(success){
        setShowAddCourse(prev=>!prev)
        dispatch({type:"RESET_SUCCESS"})
      }
      if(error){
        alert.error(error)
      }
      dispatch(getTeacherCourses(user.name))
    },[error,success,dispatch,alert,user.name])

  return (
    loading === true ? <Loading /> :
    showAddCourse === false ? 
    <div className='cp__teacher-profile-courses'>
        <h1>My Courses</h1>
        <table>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Key</th>
          </tr>
          {
            courses && courses.map((course,i)=>{
              return(
                <tr key={course.name}>
                <td>{i+1}</td>
                <td>{course.name}</td>
                <td>{course.branch}</td>
                <td>{course.key}</td>
                <td>{<RxCross2 cursor={"pointer"} onClick={()=>handleRemoveCourse(course._id)}/>}</td>
              </tr>
              )
            })
          }
        </table>
        <button className='cp__btn' onClick={()=>setShowAddCourse(!showAddCourse)}>Add Course</button>
    </div>
    :
    <form className='cp__teacher-profile-courses-add' onSubmit={handleAddCourse} encType="multipart/form-data">
      <div className='cp__teacher-profile-courses-add-img'>
        <label htmlFor="">Course Image</label>
        <input type="file"  onChange={handleImage} required/>
      </div>
        <div>
          <label htmlFor="name">Course Name</label>
          <input value={courseName} type="text" onChange={(e)=>setCourseName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="key">Key</label>
          <input value={key} type="text" onChange={(e)=>setKey(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="branch">Branch</label>
          <select value={branch} name="" id="branch" onChange={(e)=>setBranch(e.target.value)}>
            <option value="CS">CS</option>
            <option value="AI/ML">AI/ML</option>
            <option value="DS">DS</option>
            <option value="EXTC">EXTC</option>
          </select>
        </div>
        {
          /*<div>
          <label htmlFor="">Link</label>
          <input type="text" onChange={e=>setLink(e.target.value)}/>
          <button className='' onClick={(e)=>{setLinks([...links,link]);setLink("")}}>Add</button>
          <h3>Reference Links</h3>
          <ol>
            {
              links.map((link,i)=><li>{link}</li>)
            }
          </ol>
        </div>*/
        }
        <button type="submit" className='cp__btn'>SUBMIT</button>
    </form>
  )
}

export default Courses