import React, { useEffect,useState } from 'react'
import "./StudyMaterials.css"
import {DataGrid} from '@mui/x-data-grid/DataGrid';
import {BsFilter} from "react-icons/bs"
import {AiOutlineArrowUp,AiOutlineArrowDown,AiFillEye} from "react-icons/ai"
import {useSelector,useDispatch} from "react-redux"
import Loading from "../Loading/Loading"
import { RadioGroup,Radio, FormControlLabel } from '@material-ui/core'
import { getStudyMaterial } from '../../Reducers/StudyMaterial/studyMaterialAction';

const checkboxStyle = {
    color:"white",
    fontFamily:"Alkatra",
    fontSize:"2vmax"
}
const columns = [
    {
        field:"name",
        headerName:"Name",
        flex:1.5
    },
    {
        field:"branch",
        headerName:"Branch",
        flex:1
    },
    {
        field:"category",
        headerName:"Category",
        flex:1
    },
    {
        field:"author",
        headerName:"Author",
        flex:1
    },
    {
        field:"link",
        headerName:"Link",
        flex:1
    },
    {
        field:"view",
        headerName:"View",
        flex:1,
        renderCell:(params)=><AiFillEye color='white' size={30} style={{margin:"auto"}} cursor="pointer"
                             onClick={()=>window.open(params.row.link,"_blank")}   />
    }
]
const branches = ["CSE","IT","AI/ML","DS","EXTC","MCA"]
const categories = ["PYQ","Research Papers","Reference Book"]

const StudyMaterials = () => {
    const {materials,loading,error} = useSelector(state=>state.studyMaterial)
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const [branch,setBranch] = useState("")
    const [category,setCategory] = useState("")
    const rows = []
    materials && materials.forEach((m,i)=>{
        rows.push( {
            id:i,
            name:m.name,
            branch:m.branch,
            category:m.category,
            author:m.author,
            link:m.link
        })
    })
    const handleSubmit = ()=>{
        dispatch(getStudyMaterial({name,branch,category}))
    }
    useEffect(()=>{
        dispatch(getStudyMaterial())
    },[dispatch])
    return (
    loading ? <Loading /> : 
    <div className='cp__studymaterials cp__margin-navbar'>
        <div className='cp__studymaterials-left'>
            <input type="text" placeholder='Search using name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <h2>Branch</h2>
                <RadioGroup
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
                <h2>Category</h2>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    className="cp__checkbox-container"
                    onChange={(e)=>setCategory(e.target.value)}
                    value={category}
                >
                    {
                        categories.map((b,i)=><FormControlLabel value={b} control={<Radio style={checkboxStyle}/>} label={b} style={{color:"white"}} />)
                    }
                </RadioGroup>
                <button onClick={handleSubmit} className='cp__btn'>Search</button>
        </div>
        <div className='cp__studymaterials-right cp__padding'>
            <DataGrid rows={rows} columns={columns} hideFooter={true}
            slots={
                {
                    columnMenuIcon: ()=><BsFilter color='white' size={30} />,
                    columnSortedAscendingIcon: ()=><AiOutlineArrowUp color='white' size={25} />,
                    columnSortedDescendingIcon: ()=><AiOutlineArrowDown color='white' size={25} /> 
                }
            }
            initialState={{
                columns:{
                    columnVisibilityModel:{
                        link:false
                    }
                }
            }}
            />
        </div>
    </div>
  )
}

export default StudyMaterials