import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import './course.css'
import CoursePopup from './CoursePopup'


const Course = (props) => {

  const [courseDetails, setCourseDetails] = useState([]);
  // deleting the particular row
  const remove = (id) => (event) => {
    event.preventDefault();
    console.log("Course info deleted with id:", id);
    let service = "COURSE";
    const url = `http://localhost:3005/${props.name}/${service}/${id}`
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();
  }

  // to fetch the data from the url below and display using show function
  function toDisplay(event) {
    event.preventDefault();
    const url = `http://localhost:3005/home/Courses/${props.name}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      setCourseDetails(JSON.parse(xhr.response));
    }
    xhr.send();
  }
  //for edit modal
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const [getObject, setObject] = useState({});
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div>
      <Dashboard />

      <div className='table-container'>
        <button onClick={toDisplay}>Load</button>
        <table className="table table-hover">
          <thead id="tableHead">
            <tr>
              <th>ID <i className="fa fa-caret-down _idSort" aria-hidden="true"></i>
              </th>
              <th>Course name <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Description <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Start-date <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>End-date <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="courses-list">
            {
              courseDetails && courseDetails.map((index) => <><tr>
                <td>{index.course_id}</td>
                <td>{index.name}</td>
                <td>{index.desc}</td>
                <td>{index.start_date}</td>
                <td>{index.end_date}</td>
                <td>
                  <button onClick={() => { setIsOpen(true); setCourseId(index.course_id); setObject(index) }}>
                    <i className="material-icons" id="edit">edit</i>
                  </button>
                  <CoursePopup modal={isOpen} id={courseId} handleChange={togglePopup} name={props.name} obj={getObject} />

                  <button onClick={remove(index.course_id)}>
                    <i className="material-icons" id="delete">delete</i>
                  </button>
                </td>
              </tr></>)

            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Course;
