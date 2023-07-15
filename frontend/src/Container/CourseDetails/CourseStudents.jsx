import React from 'react'
import Card from '../../Components/Card/Card'

const CourseStudents = ({students,courseId}) => {
  return (
    <div className={`cp__coursedetails-assignments`}>
        <h1>Students</h1>
        <div className='cp__coursedetails-assignments-container'>
            {
              students.map(student=><Card student={student} courseId={courseId} />)
            }
        </div>

    </div>
  )
}

export default CourseStudents