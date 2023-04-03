import React from 'react'
import "./Verify.css"
import { useSelector } from 'react-redux'
import {GoUnverified} from "react-icons/go"
const Verify = ({handleNext}) => {
    const {user} = useSelector(state=>state.user)
  return (
    <div className='cp__signup-verify cp__margin cp__padding'>
        <h1>Thanks For Registering To DoCoMo</h1>
        <div>
          <GoUnverified />
          <h2>Verify your email</h2>
        </div>
        <p>To confirm your identity we have sent a mail to <b>{user.email}</b> for verification</p>
        <button onClick={handleNext}>GOT IT!</button>
    </div>
  )
}

export default Verify