import React from 'react'
import "./CourseAssignments.css"
import Assignment from '../../Components/Assignment/Assignment'


const CourseAssignments = ({assignments,enrolled,submissions}) => {
  return (
    <div className={`cp__coursedetails-assignments`}>
                {!enrolled && <span></span>}
                        <h1>Assignments</h1>
                        <div className='cp__coursedetails-assignments-container'>
                            {
                                assignments && assignments.map((a,i)=>{
                                    return (
                                        <Assignment assignment={a} submission={submissions[i]}/>
                                    )
                                })
                            }
                        </div>
            </div>
  )
}

export default CourseAssignments