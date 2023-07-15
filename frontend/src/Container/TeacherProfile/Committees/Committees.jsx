import {React,useState,useEffect} from 'react'
import "./Committees.css"
import {DataGrid} from "@mui/x-data-grid"
import {useDispatch,useSelector} from "react-redux"
import { createCommittee, getUserCommittees } from '../../../Reducers/Committee/committeeAction'
import Loading from "../../Loading/Loading"

const Committees = () => {
    const {committees,loading,error,success} = useSelector(state=>state.committee)
    const dispatch = useDispatch()
    const [showCreateCommittee,setShowCreateCommittee] = useState(false)
    const [logo,setLogo] = useState(null)
    const [name,setName] = useState("")
    const [key,setKey] = useState("")
    const [description,setDescription] = useState("")
    const handleImage = (e)=>{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            setLogo(reader.result)
        }
        
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const details = {name,key,logo,description}
        dispatch(createCommittee(details))
    }
    const columns = [{
        field:"name",
        headerName:"Name",
        flex:1
    },
    {
        field:"key",
        headerName:"Key",
        flex:1
    },{
        field:"createdAt",
        headerName:"Created At",
        flex:1
    },
]
    const rows =  committees  ? committees.map(({name,key,createdAt},i)=>{
        return(
            {
                id:i,name,key,createdAt
            }
        )
    }) : []

    useEffect(()=>{
        if(success)
            setShowCreateCommittee(false)
        dispatch(getUserCommittees)
    },[dispatch,success,error])

  return (
    loading === true ? <Loading /> :
    !showCreateCommittee ? 
    <div className='cp__teacher-profile-committees'>
        {
            rows.length > 0 && 
            <DataGrid loading={loading} rows={rows} columns={columns} 
            className="cp__datagrid" hideFooter={true} disableColumnFilter={true} 
            disableRowSelectionOnClick={true}/>
        }
        <button className='cp__btn' onClick={(e)=>setShowCreateCommittee(true)}>Create Committee</button>
    </div>
    :
    <form className='cp__create-committee' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div>
            <label htmlFor="logo">Committee Logo</label>
            <input type="file" accept="image/*" onChange={handleImage}/>
        </div>
        <div>
            <label htmlFor="name" >Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="key">Key</label>
            <input type="text" onChange={(e)=>setKey(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="4" cols="45" onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <button className='cp__btn' type='submit'>Submit</button>
    </form>
  )
}

export default Committees