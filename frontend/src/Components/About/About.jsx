import {React,useEffect} from 'react'
import Box from '../Box/Box'
import "./About.css"
import {AiOutlinePlusCircle} from "react-icons/ai"
import Loading from '../../Container/Loading/Loading'

const About = ({path,title,array=null,loading}) => {
  return (
    loading ? <Loading /> :
    <div className='cp__home__about cp__padding'>
    <h1>{title}</h1>
    <div className='cp__home__about-container'>
        {
          array && array.map((d,i)=><Box key={i} path={path} img={d.image?.url} name={d.name} id={d._id} />)
        }
        <div className='cp__home__about-container-more'>
            <AiOutlinePlusCircle size={75} cursor={"pointer"}/>
            <p>More</p>
        </div>
    </div>
</div>
  )
}

export default About