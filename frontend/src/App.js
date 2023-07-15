import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Navbar from './Container/Navbar/Navbar/Navbar';
import Home from './Container/Home/Home';
import SignUp from './Container/SignUp/SignUp';
import Login from './Container/Login/Login';
import {useSelector,useDispatch} from 'react-redux'
import { getUserDetails } from './Reducers/User/userAction';
import ProtectedRoute from './ProtectedRoute';
import TeacherProfile from './Container/TeacherProfile/TeacherProfile';
import Events from './Container/Events/Events';
import Committees from './Container/Committees/Committees';
import CommitteeDetails from './Container/CommitteeDetails/CommitteeDetails';
import EventDetails from './Container/EventDetails/EventDetails';
import StudyMaterials from './Container/StudyMaterials/StudyMaterials';
import Courses from './Container/Courses/Courses';
import CourseDetails from './Container/CourseDetails/CourseDetails';
import Assignments from './Container/Assignments/Assignments';
import StudentProfile from './Container/StudentProfile/StudentProfile';

function App() {
  const {user,isAuthenticated,error} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getUserDetails)
  },[dispatch])
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/teacher/profile' element={<TeacherProfile />} />
            <Route path='/events' element={<Events />} />
            <Route path="/committees" element={<Committees />} />
            <Route exact path='/committees/:id' element={<CommitteeDetails />} />
            <Route exact path='/events/:id' element={<EventDetails />} />
            <Route exact path='/studymaterials' element={<StudyMaterials />} />
            <Route exact path='/courses' element={<Courses />} />
            <Route exact path='/courses/:id' element={<CourseDetails />} />
            <Route exact path='/assignments' element={<Assignments role={user?.role} />}/>
            <Route exact path='/student/profile' element={<StudentProfile />} />
            <Route exact path='/student/assignments/:id' element={<Assignments role={user?.role} />}/>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
