import React from 'react'
import "./Card.css"
import { useNavigate } from 'react-router-dom'

const Card = ({student,courseId}) => {
    const navigate = useNavigate()
  return (
    <div className='cp__card'>
        <div onClick={()=>navigate(`/student/assignments/${student._id}?course=${courseId}`)} className='cp__card-img'>
            <img src={student.avatar?.url} alt="" />
        </div>
        <div className='cp__card-details'>
            <div>
                <b>Name: </b>
                <p>{student.name}</p>
            </div>
            <div>
                <b>UID: </b>
                <p>{student.studentId}</p>
            </div>
            <div>
                <b>Branch: </b>
                <p>{student.branch}</p>
            </div>
            <div>
                <b>Year: </b>
                <p>{student.yearOfStudy}</p>
            </div>
        </div>
    </div>
  )
}

export default Card