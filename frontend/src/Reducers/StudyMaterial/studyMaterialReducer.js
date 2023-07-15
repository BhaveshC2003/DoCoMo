import {createReducer} from "@reduxjs/toolkit"

const studyMaterial = createReducer({},{
    UPLOAD_SM_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    UPLOAD_SM_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            success:true
        }
    },
    UPLOAD_SM_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload,
            success:true
        }
    },
    GET_SM_REQUEST:(state,action)=>{
        return{
            ...state,
            loading:true
        }
    },
    GET_SM_SUCCESS:(state,action)=>{
        return{
            ...state,
            loading:false,
            materials:action.payload
        }
    },
    GET_SM_FAIL:(state,action)=>{
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    }
})

export default studyMaterial