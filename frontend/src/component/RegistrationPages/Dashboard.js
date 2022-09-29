import { useAuth0 } from "@auth0/auth0-react";
import React from 'react'
import './style.css'
import { Link } from "react-router-dom";
import io from 'socket.io-client'
const socket = io("http://localhost:3005");



const Dashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { logout } = useAuth0();
    function handleSignOut(e) {
        e.preventDefault();
        logout({ returnTo: window.location.origin });
        socket.emit("disconnect", sessionStorage.getItem('socketId'));
       
    }
    if (isLoading) {
        return <div>Loading ...</div>;
      }

    return (
        isAuthenticated && ( 
            <>
            <div className='header'>
                Student-Course Registration
                <button id="signout" onClick={handleSignOut}>{user.email} SignOut</button>
            </div>
            <div className='left-navibar'>
                <ul>
                    <li><Link className="nav-item" to="/dashboard/student">Student</Link></li>
                    <li><Link className="nav-item" to="/dashboard/add-student">Add Student</Link></li>
                    <li><Link className="nav-item" to="/dashboard/course">Courses</Link></li>
                    <li><Link className="nav-item" to="/dashboard/add-course">Add Course</Link></li>
                    <li><Link className="nav-item" to="/dashboard/report">Report</Link></li>
                </ul>
            </div>

        </>)
    )
}

export default Dashboard;
