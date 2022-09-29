import React, { useState } from 'react'
import './popup.css'
import '../RegistrationPages/allTables/student.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const StudentPopup = ({ modal, sid, aid, handleChange, name, obj }) => {
    //for storing edit form details.   
    const [inputField, setInputField] = useState({})

    const inputsHandler = (e) => {
        e.preventDefault();
        setInputField((inputField) =>
        ({
            ...inputField,
            [e.target.name]: e.target.value,
        }));
    }
    //function edit to be performed on table data
    async function edit(event) {
        event.preventDefault();
        let addressData1 = {
            "street_address": inputField.street,
            "landmark": inputField.landmark,
            "city": inputField.city,
            "state": inputField.state,
            "country": inputField.country,
            "zipcode": parseInt(inputField.zipcode),
        }
        //create student object with all data
        let studData1 = {
            "fname": inputField.fname,
            "lname": inputField.lname,
            "gender": inputField.gender,
            "age": parseInt(inputField.age),
            "contact_no": parseFloat(inputField.contact),
        }
        let service1 = "ADDRESS";
        await fetch(`http://localhost:3005/${name}/update/${service1}/${aid}`, {  // Enter your IP address here

            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressData1) // body data type must match "Content-Type" header
        });
        let service = "STUDENT";
        await fetch(`http://localhost:3005/${name}/update/${service}/${sid}`, {  // Enter your IP address here

            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studData1) // body data type must match "Content-Type" header
        });
        console.log(addressData1);
        console.log(studData1);
        handleChange();
    }

    return (
        <Modal isOpen={modal} toggle={handleChange}>
            <ModalHeader toggle={handleChange}>Edit</ModalHeader>
            <ModalBody>
                <span className="title">Student Details</span>
                <div className="fields">
                    <div className="input-field">
                        <label>First Name: </label>
                        <input type="text" name="fname" defaultValue={obj.fname} onChange={inputsHandler} placeholder="Enter your first name" required/>
                    </div>

                    <div className="input-field">
                        <label>Last Name: </label>
                        <input type="text" name="lname" defaultValue={obj.lname} onChange={inputsHandler} placeholder="Enter your last name" required />
                    </div>

                    <div className="input-field">
                        <label>Gender: </label>
                        <select name="gender" defaultValue={obj.gender} onChange={inputsHandler} required>
                            <option disabled selected>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        <label>&nbsp;&nbsp; Age: </label>
                        <input type="text" name="age" defaultValue={obj.age} onChange={inputsHandler} placeholder="Enter your age" required />
                    </div>

                    <div className="input-field">
                        <label>Mobile Number: </label>
                        <input type="number" name="contact" defaultValue={obj.contact_no} onChange={inputsHandler} placeholder="Enter mobile number" required />
                    </div>
                </div>
                <hr />
                <div className="details">
                    <span className="title">Address Details</span>
                    <div className="fields">
                        <div className="input-field">
                            <label>Street-Address: </label>
                            <input type="text" name="street" onChange={inputsHandler} placeholder="Enter your Street-Address" required />
                        </div>

                        <div className="input-field">
                            <label>Landmark: </label>
                            <input type="text" name="landmark"  onChange={inputsHandler} placeholder="Enter Landmark" required />
                        </div>

                        <div className="input-field">
                            <label>City:&nbsp;</label>
                            <input type="text" name="city"   onChange={inputsHandler} placeholder="Enter city" required />

                            <label>&nbsp;&nbsp;State:&nbsp;</label>
                            <input type="text" name="state" onChange={inputsHandler} placeholder="Enter state" required />
                        </div>

                        <div className="input-field">
                            <label>Country:&nbsp;</label>
                            <input type="text" name="country"  onChange={inputsHandler} placeholder="Enter country" required />

                            <label>&nbsp;&nbsp;Zipcode:&nbsp;</label>
                            <input type="number" name="zipcode"  onChange={inputsHandler} placeholder="Enter area zipcode" required />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={edit}>Update</Button>{' '}
                <Button color="secondary" onClick={handleChange}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default StudentPopup
