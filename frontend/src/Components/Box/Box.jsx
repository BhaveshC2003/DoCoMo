import React from 'react'
import "./Box.css"
import { Link } from 'react-router-dom'

const Box = ({path="",img,name,id}) => {
  return (
    <div className='cp__box'>
        <div className='cp__box-container'>
            <div className='cp__box-container-img'>
                <img src={img} alt="image" />
            </div>
            <div className='cp__box-effect'>
                  <button ><Link to={path ? `${path}/${id}` : `${id}`} style={{color:"black"}} >ABOUT</Link></button>
                  
            </div>
        </div>
        <h2>{name || "Unkown"}</h2>
    </div>
  )
}

export default Box