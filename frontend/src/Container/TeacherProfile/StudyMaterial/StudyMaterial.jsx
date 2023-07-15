import {React,useState,useEffect} from 'react'
import "./StudyMaterial.css"
import Chip from "@mui/material/Chip"
import {useDispatch,useSelector} from "react-redux"
import { uploadStudyMaterial } from '../../../Reducers/StudyMaterial/studyMaterialAction'
import Loading from "../../Loading/Loading"
import {useAlert} from "react-alert"

const categories = ["PYQ","Research Papers","Reference Book"]
const tagsOptions = ["Exam","Research","ESE","MSE","First Year","Second Year","Third Year","Fourth Year"]
const chipStyle = {
    color:"white",
    fontSize:"1.3vmax",
    backgroundColor:"var(--prim-bg-color)",
    margin:"0 3px"
}
const StudyMaterial = () => {
    const alert = useAlert()
    const {loading,error,success} = useSelector(state=>state.studyMaterial)
    const dispatch = useDispatch()
    const [file,setFile] = useState(null)
    const [name,setName] = useState("")
    const [branch,setBranch] = useState("CSE")
    const [category,setCategory] = useState("")
    const [tags,setTags] = useState([])
    const handleTags = (tag)=>{
        const newTags = tags.filter(x=>x !== tag)
        setTags(newTags)
    }
    const addTags = (e)=>{
        if(tags.includes(e.target.value))
            return
        setTags(prev=>[...prev,e.target.value])
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(uploadStudyMaterial({file,name,branch,category}))
    }
    useEffect(()=>{
        if(success){
            alert.success("File uploaded successfully")
            dispatch({type:"RESET_SUCCESS"})
        }
        if(error){
            alert.error(error)
        }
    },[success,error])
  return (
    loading ? <Loading /> :
    <form className='cp__teacher-profile-studymaterial' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='cp__teacher-profile-studymaterial-container'>
            <div className='cp__teacher-profile-studymaterial-file'>
                <label htmlFor="">Upload File</label>
                <input accept='application/pdf' type="file" onChange={(e)=>setFile(e.target.files[0])} name="file"/>
            </div>
            <div className='cp__teacher-profile-studymaterial-info'>
                <div>
                    <label htmlFor="">File Name</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Branch</label>
                    <select name="" id="" onChange={(e)=>setBranch(e.target.value)}>
                        <option value="CSE">CSE</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="DS">DS</option>
                        <option value="EXTC">EXTC</option>
                        <option value="MCA">MCA</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <select name="" id="" onChange={(e)=>setCategory(e.target.value)}>
                        {
                            categories.map((cat,i)=><option key={cat} value={cat}>{cat}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Tags</label>
                    <select name="" id="" onChange={addTags}>
                        
                        {
                            tagsOptions.map((tag,i)=><option key={tag} value={tag}>{tag}</option>)
                        }
                    </select>
                </div>
                <div className='cp__tags-container'>
                        {
                             tags.map((tag,i)=><Chip key={tag} label={tag} onDelete={()=>handleTags(tag)} style={chipStyle}/>)
                        }
                </div>
            </div>
        </div>
        <button type='submit' className='cp__btn'>Upload</button>
    </form>
  )
}

export default StudyMaterial