import React from 'react'
import Dashboard from '../Dashboard'
import './student.css'

const AddStudent = (props) => {

    async function add(event) {
        event.preventDefault();
        //create address object details]
        let addressData = {
            "street_address": document.getElementById('street').value,
            "landmark": document.getElementById('landmark').value,
            "city": document.getElementById('city').value,
            "state": document.getElementById('state').value,
            "country": document.getElementById('country').value,
            "zipcode": parseInt(document.getElementById('zipcode').value),
        }
        //create student object with all data
        let studData = {
            "fname": document.getElementById('fname').value,
            "lname": document.getElementById('lname').value,
            "gender": document.getElementById('gender').value,
            "age": parseInt(document.getElementById('age').value),
            "contact_no": parseFloat(document.getElementById('contact').value),
            "address": addressData
        }
        let service = "STUDENT";


        await fetch(`http://localhost:3005/${props.name}/${service}`, {  // Enter your IP address here

            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studData) // body data type must match "Content-Type" header
        });

    }
    return (
        <div>
            <Dashboard />
            <div className="container">
                <form encType="multipart/form-data" >
                    <div className="form" >
                        <div className="details personal">
                            <span className="title">Student Details</span>

                            <div className="fields">
                                <div className="input-field">
                                    <label>First Name</label>
                                    <input type="text" id="fname" placeholder="Enter your first name" required />
                                </div>

                                <div className="input-field">
                                    <label>Last Name</label>
                                    <input type="text" id="lname" placeholder="Enter your last name" required />
                                </div>

                                <div className="input-field">
                                    <label>Gender</label>
                                    <select id="gender" required>
                                        <option disabled selected>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className="input-field">
                                    <label>Age</label>
                                    <input type="text" id="age" placeholder="Enter your age" required />
                                </div>

                                <div className="input-field">
                                    <label>Mobile Number</label>
                                    <input type="number" id="contact" placeholder="Enter mobile number" required />
                                </div>

                                <div className="input-field">
                                    <label>Course-ID</label>
                                    <input type="text" placeholder="Enter course ID to register" required />
                                </div>
                            </div>
                            <hr />
                            <div className="details">
                                <span className="title">Address Details</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label>Street-Address</label>
                                        <input type="text" id="street" placeholder="Enter your Street-Address" required />
                                    </div>

                                    <div className="input-field">
                                        <label>Landmark</label>
                                        <input type="text" id="landmark" placeholder="Enter Landmark" required />
                                    </div>

                                    <div className="input-field">
                                        <label>City</label>
                                        <input type="text" id="city" placeholder="Enter city" required />
                                    </div>

                                    <div className="input-field">
                                        <label> State</label>
                                        <input type="text" id="state" placeholder="Enter state" required />
                                    </div>

                                    <div className="input-field">
                                        <label>Country</label>
                                        <input type="text" id="country" placeholder="Enter country" required />
                                    </div>

                                    <div className="input-field">
                                        <label>Zipcode</label>
                                        <input type="number" id="zipcode" placeholder="Enter area zipcode" required />
                                    </div>
                                </div>

                                <button className="submitBtn" onClick={add}>
                                    <span className="btnText" >Submit</span>
                                </button>
                            </div>
                        </div>

                    </div>        </form>
            </div>


        </div>
    )
}

export default AddStudent
