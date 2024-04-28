import React, { ReactNode } from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}:{ children: ReactNode }) => {
    const user = useSelector((state:any) => state.user);
    let location = useLocation();

    if(!user.state.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;