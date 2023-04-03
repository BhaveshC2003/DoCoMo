import React from 'react'
import './Role.css'

const Role = ({setRole,handleNext}) => {
  return (
    <div className='cp__signup-role cp__margin cp__padding'>
        <div>
            <p>Select Your Role</p>
            <select onChange={(e)=>setRole(e.target.value)}>
                <option value={""}>------</option>
                <option value={"student"}>Student</option>
                <option value={"teacher"}>Teacher</option>
            </select>
        </div>
        <div className='cp__signup-btn'>
            <button onClick={handleNext}>Confirm</button>
        </div>
    </div>
  )
}

export default Role