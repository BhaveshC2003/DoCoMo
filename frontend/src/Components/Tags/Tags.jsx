import React from 'react'
import "./Tags.css"
import {RxCross2} from "react-icons/rx"

const Tags = ({name,dispatch}) => {
  return (
    <div className='cp__tags'>
        <p>{name}</p>
        <RxCross2 color='white' style={{marginLeft:"2px"}} cursor="pointer" onClick={()=>dispatch({type:"removeTag",payload:name})}/>
    </div>
  )
}

export default Tags