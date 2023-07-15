import {createReducer} from "@reduxjs/toolkit"

const assignment = createReducer({},{
    CREATE_ASSIGNMENT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    CREATE_ASSIGNMENT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            message:action.payload
        }
    },
    CREATE_ASSIGNMENT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    RESET_MESSAGE:(state,action)=>{
        return{
            ...state,
            message:null,
            success:false
        }
    },
    UPLOAD_ASSIGNMENT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    UPLOAD_ASSIGNMENT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false
        }
    },
    UPLOAD_ASSIGNMENT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    GET_ASSIGNMENT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true,
            assignments:null
        }
    },
    GET_ASSIGNMENT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            assignments:action.payload.assignments,
            submissions:action.payload.submissions
        }
    },
    GET_ASSIGNMENT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    },
    GRADE_STUDENT_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    GRADE_STUDENT_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:true,
            message:action.payload
        }
    },
    GRADE_STUDENT_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:false,
            error:action.payload
        }
    }

})

export default assignment