import React from 'react'
import "./Members.css"

const Members = ({member}) => {
  return (
    <div>
        <div className='cp__members'>
        <div className='cp__members-img'>
            <img src={member.avatar.url} alt="Profile" />
        </div>
        <div className='cp__members-details'>
            <div>
                <b>Name: </b>
                <p>{member.name}</p>
            </div>
            <div>
                <b>Role: </b>
                <p>{member.role}</p>
            </div>
            <div>
                <b>Status: </b>
                <p>{member.status}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Members