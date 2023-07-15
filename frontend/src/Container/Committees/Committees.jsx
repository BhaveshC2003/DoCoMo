import {React,useEffect,useState} from 'react'
import "./Committees.css"
import { Checkbox, FormControlLabel,FormGroup } from '@material-ui/core'
import Box from "../../Components/Box/Box"
import {useDispatch,useSelector} from "react-redux"
import { getCommittees } from '../../Reducers/Committee/committeeAction'
import Loading from "../Loading/Loading"

const Committees = () => {
    const {committees,loading,error,success} = useSelector(state=>state.committee)
    const dispatch  = useDispatch()
    const [committee,setCommittee] = useState([])
    const handleCommittees = (e)=>{
        if(e.target.checked){
            setCommittee(prev=>[...prev,e.target.value])
        }else{
            const newArr = committee.filter(x=>x !== e.target.value)
            setCommittee(newArr)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(committee)
        dispatch(getCommittees(JSON.stringify(committee)))
        
    }
    const committeesOptions = ["CSI","E-Cell","Spark","Enactus","Mudra","IEEE","Oculus 2023"]
    const checkboxStyle = {
        color:"white",
        fontFamily:"Alkatra",
        fontSize:"2vmax"
    }
    useEffect(()=>{
        dispatch(getCommittees(JSON.stringify(committee)))
    },[dispatch,committee])
  return (
    loading ? <Loading /> :
    <form className='cp__committees cp__margin-navbar' onSubmit={handleSubmit}>
        <div className='cp__committees-left'>
                <h3>Committees</h3>
                <FormGroup className='cp__checkbox-container'>
                    {
                        committeesOptions.map((c,i)=>
                        <FormControlLabel control={<Checkbox checked={committee.includes(c)} value={c} style={checkboxStyle} 
                        onClick={handleCommittees}/>} label={c} />)
                    }
                </FormGroup>
        </div>
        <div className='cp__committees-right cp__margin'>
            <div className='cp__committees-right-container cp__margin'>
                {
                    committees && committees.map((c,i)=><Box key={i} img={c.image.url} name={c.name} id={c._id}/>)
                }
            </div>
        </div>
    </form>
  )
}

export default Committees