import {configureStore} from "@reduxjs/toolkit"
import user from "./Reducers/User/userReducer"

export default configureStore({
    reducer:{
        user:user
    }
})