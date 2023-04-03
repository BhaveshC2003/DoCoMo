import React from 'react'
import Box from '../Box/Box'
import "./About.css"
import {AiOutlinePlusCircle} from "react-icons/ai"

const About = ({title,img}) => {
  return (
    <div className='cp__home__about cp__padding'>
        <h1>{title}</h1>
        <div className='cp__home__about-container'>
            <Box img={img}/>
            <Box img={img}/>
            <Box img={img}/>
            <div className='cp__home__about-container-more'>
                <AiOutlinePlusCircle size={75} cursor={"pointer"}/>
                <p>More</p>
            </div>
        </div>
    </div>
  )
}

export default About