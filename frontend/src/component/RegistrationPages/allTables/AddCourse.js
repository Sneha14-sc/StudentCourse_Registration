import React from 'react'
import Dashboard from '../Dashboard'
import './course.css'
import './student.css'

const AddCourse = (props) => {

  async function addCourse(event) {
    event.preventDefault();
    let courseData = {
      name: document.getElementById('cname').value,
      desc: document.getElementById('desc').value,
      start_date: document.getElementById('sdate').value,
      end_date: document.getElementById('edate').value,
    }
    let service = "COURSE";
    await fetch(`http://localhost:3005/${props.name}/${service}`, {  // Enter your IP address here

      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData) // body data type must match "Content-Type" header
    });
  }
  return (
    <div>
      <Dashboard />
      <div className="container">
        <form encType="multipart/form-data">
          <div className="form ">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Course Name</span>
                <input type="text" id="cname" placeholder="Enter Course name" required />
              </div>
              <div className="input-box">
                <span className="details">Description</span>
                <textarea id="desc" placeholder="Enter description" rows="4" cols="25" required></textarea>
              </div>
              <div className="input-box">
                <span className="details">Start-date</span>
                <input type="Date" id="sdate" placeholder="Enter start date" required />
              </div>
              <div className="input-box">
                <span className="details">End-date</span>
                <input type="Date" id="edate" placeholder="Enter end date" required />
              </div>
            </div>
            <button className="submitBtn" onClick={addCourse}>
              <span className="btnText">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div >

  )
}

export default AddCourse
