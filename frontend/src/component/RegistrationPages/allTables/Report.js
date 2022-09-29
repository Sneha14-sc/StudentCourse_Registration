import React, {useState} from 'react'
import Dashboard from '../Dashboard'

const Report = (props) => {
  const [studCourDetails, setstudCourDetails] = useState([]);
  const edit = id => (event) => {
    event.preventDefault();
    console.log(id)
  }
  const remove = (id) => (event) => {
    event.preventDefault();
    console.log("Report deleted for id:", id);
    let service = "STUD_COURSE";
    const url = `http://localhost:3005/${props.name}/${service}/${id}`
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);
    xhr.send();
  }
  async function add(event) {
    event.preventDefault();
      let reportData ={
        fees: document.getElementById('fees').value,
        student_ids: document.getElementById('sid').value,
        course_ids: document.getElementById('cid').value,
      }
      let service = "STUD_COURSE";
      await fetch(`http://localhost:3005/${props.name}/${service}`, {  // Enter your IP address here

          method: 'POST',
          mode: 'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(reportData) // body data type must match "Content-Type" header
      });
    }
      function toDisplay(event) {
        event.preventDefault();
        const url = `http://localhost:3005/home/stud-courses/${props.name}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
          setstudCourDetails(JSON.parse(xhr.response));
        }
        xhr.send();
      }
  
  return (
    <div>
      <Dashboard />
      <div className="container">
        <form id="form3" encType="multipart/form-data">
          <div className="user-details">
              <span className="details">Student ID</span>
              <input type="text" id="sid" placeholder="Enter Student id" required />
          
              <span className="details">Course ID</span>
              <input type="text" id="cid" placeholder="Enter Course id" required />
            
              <span className="details">Fees</span>
              <input type="number" id="fees" placeholder="Enter Fees for course" required />
            
              <button onClick={add}>
                <span >Submit</span>
              </button>
            
          </div>
        </form>
      </div>
      <div className='table-container'>
      <button onClick={toDisplay}>Load</button>
        <table className="table table-hover">
          <thead id="tableHead">
            <tr>
              <th>ID <i className="fa fa-caret-down _idSort" aria-hidden="true"></i>
              </th>
              <th>Student_name <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Course_name <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Fees <i className="fa fa-caret-down nameSort" aria-hidden="true"></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="Report">
          { 
            studCourDetails && studCourDetails.map((index) => <><tr>
              <td>{index.stud_course_id}</td>
              <td>{index.student['fname']+" "+index.student['lname']}</td>
              <td>{index.course['name']}</td>
              <td>{index.fees}</td>
              <td>
                <button onClick={edit(index.stud_course_id)}>
                  <i className="material-icons" id="edit">edit</i>
                </button>
                <button onClick={remove(index.stud_course_id)}>
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

export default Report
