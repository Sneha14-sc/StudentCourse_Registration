import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CoursePopup = ({ modal, id, handleChange, name, obj }) => {
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
        let courseData1 = {
            name: inputField.name,
            desc: inputField.desc,
            start_date: inputField.start_date,
            end_date: inputField.end_date,
        }
        let service = "COURSE";
        await fetch(`http://localhost:3005/${name}/update/${service}/${id}`, {  // Enter your IP address here

            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData1) // body data type must match "Content-Type" header
        });
        handleChange();
    }

    return (
        <Modal isOpen={modal} toggle={handleChange}>
            <ModalHeader toggle={handleChange}>Edit</ModalHeader>
            <ModalBody>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Course Name</span>
                        <input type="text" name="name" defaultValue={obj.name} onChange={inputsHandler} placeholder="Enter Course name" required />
                    </div>
                    <div className="input-box">
                        <span className="details">Description</span>
                        <textarea name="desc" defaultValue={obj.desc} onChange={inputsHandler} placeholder="Enter description" rows="4" cols="25" required></textarea>
                    </div>
                    <div className="input-box">
                        <span className="details">Start-date</span>
                        <input type="Date" name="start_date" placeholder="Enter start date" required />
                    </div>
                    <div className="input-box">
                        <span className="details">End-date</span>
                        <input type="Date" name="end_date" placeholder="Enter end date" required />
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

export default CoursePopup
