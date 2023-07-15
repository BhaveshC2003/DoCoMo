import { createReducer } from "@reduxjs/toolkit";

const course = createReducer({},{
    GET_COURSES_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            error:null,
            courses:null
        }
    },
    GET_COURSES_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:null,
            courses:action.payload
        }
    },
    GET_COURSES_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:null
        }
    },
    ADD_COURSE_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            error:null,
            message:null
        }
    },
    ADD_COURSE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:null,
            message:action.payload,
            success:true
        }
    },
    ADD_COURSE_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            message:null
        }
    },
    REMOVE_COURSE_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            
        }
    },
    REMOVE_COURSE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false
        }
    },
    REMOVE_COURSE_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    GET_COURSE_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            courseDetails:null        }
    },
    GET_COURSE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            courseDetails:action.payload.courseDetails,
            enrolled:action.payload.enrolled,
            assignments:action.payload.assignments,
            submissions:action.payload.submissions
        }
    },
    GET_COURSE_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    JOIN_COURSE_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    JOIN_COURSE_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            message:action.payload
        }
    },
    JOIN_COURSE_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    }
})

export default course