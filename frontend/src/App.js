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
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
