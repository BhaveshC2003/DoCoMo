import React from 'react'
import {Outlet,Navigate} from "react-router-dom"

const ProtectedRoute = ({isAuthenticated}) => {
  return (
        isAuthenticated === true ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default ProtectedRoute