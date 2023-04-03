import {React} from 'react'
import "./Home.css"
import {default as header} from "../../static/media/header.jpg"
import About from '../../Components/About/About'
import {default as hackathon} from "../../static/media/Events/hackathon.png"
import {default as sample} from "../../static/media/Events/sample.jpeg"
import {default as ml} from "../../static/media/Courses/ml.jpg"
import {default as study} from "../../static/media/Study/study.jpg"

const Home = () => {
  return (
    <div className='cp__home cp__margin-navbar cp__padding'>
        <div className='cp__home-header cp__margin'>
            <h1>Welcome To DoCoMo</h1>
            <div className='cp__home-header-container'>
                <div className='cp__home-header-left'>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Iste debitis voluptates alias nostrum. Asperiores non 
                        maxime cum repudiandae, assumenda repellat dolorem quae 
                        facilis quod autem ipsum, id natus, alias incidunt.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Iste debitis voluptates alias nostrum. Asperiores non 
                        maxime cum repudiandae, assumenda repellat dolorem quae 
                        facilis quod autem ipsum, id natus, alias incidunt.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Iste debitis voluptates alias nostrum. Asperiores non 
                        maxime cum repudiandae, assumenda repellat dolorem quae 
                        facilis quod autem ipsum, id natus, alias incidunt.
                    </p>
                </div>
                <div className='cp__home-header-right'>
                    <div className='cp__home-header-right-img'>
                        <img src={header} alt="" />
                    </div>
                </div>
            </div>
        </div>
        <About title={"UPCOMING EVENTS"} img={hackathon}/>
        <About title={"COMMITTEES"} img={sample}/>
        <About title={"COURSES"} img={ml}/>
        <div className='cp__home-study-material cp__margin cp__padding'>
            <div className='cp__home-study-material-left'>
                <h2>Having Trouble Finding Reference?</h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Iste debitis voluptates alias nostrum. Asperiores non 
                    maxime cum repudiandae, assumenda repellat dolorem quae 
                    facilis quod autem ipsum, id natus, alias incidunt.
                </p>
                <button>EXPLORE</button>
            </div>
            <div className='cp__home-study-material-right'>
                <div>
                    <img src={study} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home