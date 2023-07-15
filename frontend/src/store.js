import {configureStore} from "@reduxjs/toolkit"
import user from "./Reducers/User/userReducer"
import course from "./Reducers/Course/courseReducer"
import committee from "./Reducers/Committee/committeeReducer"
import studyMaterial from "./Reducers/StudyMaterial/studyMaterialReducer"
import event from "./Reducers/Event/eventReducer"
import assignment from "./Reducers/Assignment/assignmentReducer"

export default configureStore({
    reducer:{
        user:user,
        course:course,
        committee:committee,
        studyMaterial:studyMaterial,
        event:event,
        assignment:assignment
    }
})