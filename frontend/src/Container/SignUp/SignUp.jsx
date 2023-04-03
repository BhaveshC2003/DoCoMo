import {React,useState} from 'react'
import "./SignUp.css"
import { Stepper, Step, StepLabel,Typography} from '@material-ui/core';
import {FaUsers} from "react-icons/fa"
import {IoIosInformationCircle} from "react-icons/io"
import {GoVerified} from "react-icons/go"
import Role from "../../Components/SignUp/Role"
import StudentDetails from "../../Components/SignUp/StudentDetails"
import TeacherDetails from "../../Components/SignUp/TeacherDetails"
import {useNavigate} from "react-router-dom"
import Verify from '../../Components/SignUp/Verify';

const SignUp = () => {
    const[activeStep,setActiveStep] = useState(0)
    const [role,setRole] = useState("")
    const navigate = useNavigate()
    const steps = [
        {
            label:<Typography style={{fontFamily:"Alkatra",fontSize:"1.4vmax",margin:"-5px",color:'white'}}>Role</Typography>,
            icon:<FaUsers size={40}/>
        },{
            label:<Typography style={{fontFamily:"Alkatra",fontSize:"1.4vmax",margin:"-5px",color:'white'}}>Personal Information</Typography>,
            icon:<IoIosInformationCircle size={40}/>
        },{
            label:<Typography style={{fontFamily:"Alkatra",fontSize:"1.4vmax",margin:"-5px",color:'white'}}>Verify</Typography>,
            icon:<GoVerified size={40}/>
        }
    ]
    const handleNext = ()=>{
        console.log(activeStep)
        if(activeStep+1 >= 3){
            setActiveStep(0)
            navigate("/")
        }else
            setActiveStep(prev=>prev+1)
    }
  return (
    <div className='cp__signup cp__margin-navbar'>
        <Stepper alternativeLabel style={{backgroundColor:"var(--prim-bg-color)"}} activeStep={activeStep}>
            {
                steps.map((step,i)=>{
                    return(
                        <Step key={i} active={activeStep===i ? true : false} completed={activeStep>=i ? true : false}>
                            <StepLabel icon={step.icon} style={{color:activeStep>=i ? 'lightgreen' : 'white',margin:"-6px 0"}}>
                                {step.label}
                            </StepLabel>
                        </Step>
                    )
                })
            }
        </Stepper>
        {
           activeStep === 0 ? <Role setRole={setRole} handleNext={handleNext}/> : activeStep === 1 ? (role === "teacher" ? <TeacherDetails handleNext={handleNext}/> : <StudentDetails handleNext={handleNext}/>) 
           : <Verify handleNext={handleNext}/>
        }
        
    </div>
  )
}

export default SignUp