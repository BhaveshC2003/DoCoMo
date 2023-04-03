import React from 'react'
import "./Box.css"

const Box = ({img}) => {
  return (
    <div className='cp__box'>
        <div className='cp__box-container'>
            <div className='cp__box-container-img'>
                <img src={img} alt="" />
            </div>
            <div className='cp__box-effect'>
                  <button>ABOUT</button>
                  <button>REGISTER</button>
            </div>
        </div>
        <h2>HACKATHON</h2>
    </div>
  )
}

export default Box