import './App.css';
import Login from './component/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './component/RegistrationPages/Dashboard';
import Student from './component/RegistrationPages/allTables/Student';
import Course from './component/RegistrationPages/allTables/Course';
import AddStudent from './component/RegistrationPages/allTables/AddStudent';
import AddCourse from './component/RegistrationPages/allTables/AddCourse';
import Report from './component/RegistrationPages/allTables/Report';
import io from 'socket.io-client'
const socket = io("http://localhost:3005");


function App() {
  //socket connection
  socket.on("connection");
      // receiveing generated socket id
  socket.on("generateID", (result) =>{
    sessionStorage.setItem("socketId", result);
  });
  
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
      </Routes>
      <Routes>
        <Route  path="/dashboard" element={<Dashboard />}/>
      <Route  path="/dashboard/student" element={<Student name={sessionStorage.getItem("socketId")}/>} />
      <Route path="/dashboard/add-student" element={<AddStudent name={sessionStorage.getItem("socketId")}/>} />
      <Route  path="/dashboard/course" element={<Course name={sessionStorage.getItem("socketId")}/>} />
      <Route path="/dashboard/add-course" element={<AddCourse name={sessionStorage.getItem("socketId")}/>} />
      <Route path="/dashboard/report" element={<Report name={sessionStorage.getItem("socketId")}/>} />
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
