import React from 'react'
import axios from 'axios'

import '../index.css'

import { Form, Button } from 'react-bootstrap'


class AddShiftPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeID: '',
            startTime: '',
            endTime: '',
            position: '',
            location: '', 
            success: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        
        this.setState({
            ...this.state,
            [event.target.name]: value
          });
      }
    
    
    handleSubmit(event) {
        event.preventDefault();
        const employeeID = this.state.employeeID
        const startTime = this.state.startTime
        const endTime = this.state.endTime
        const position = this.state.position
        const location = this.state.location

        this.submitData(employeeID, startTime, endTime, position, location)
    }


    submitData = (employeeID, startTime, endTime, position, location) => {
        axios.post('http://localhost:3000/addShift?employeeID=' + employeeID + '&startTime=' + startTime + '&endTime=' + endTime + '&position=' + position + '&location=' + location).then(res => {
            if(res.data.affectedRows === 0) this.setState({success: false})
            if(res.data.affectedRows === 1) this.setState({success: true})
        })
        .catch( (error) => {
            this.setState({success: false})
            alert('Error Adding Shift, check for valid Employee ID!')
            console.log(error)
        });
    }

    render() {
        const renderStatusLabel = () => {
            let success = this.state.success
            if(success === null) {
                return
            }

            if(success) {
                return <Form.Label className='greentext'>Successfully Added Shift</Form.Label>
            }

            if(success === false) {
                return <Form.Label className='redtext'>Error Adding Shift</Form.Label>
            }
        }

        return (
            <div>
                <Form className='form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formShiftID">
                        <Form.Label className='label'>Employee ID</Form.Label>
                        <Form.Control type="number" placeholder="Enter Employee ID" name="employeeID" value={this.state.employeeID} onChange={this.handleChange} />
                        <Form.Label className='label'>Start Time</Form.Label>
                        <Form.Control type="datetime-local" placeholder="Enter Start Time" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                        <Form.Label className='label'>End Time</Form.Label>
                        <Form.Control type="datetime-local" placeholder="Enter End ID" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                        <Form.Label className='label'>Position</Form.Label>
                        <Form.Control type="text" placeholder="Enter Employee Position" name="position" value={this.state.position} onChange={this.handleChange} />
                        <Form.Label className='label'>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Employee Location" name="location" value={this.state.location} onChange={this.handleChange} />
                    </Form.Group>
    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div>
                        {renderStatusLabel()}
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddShiftPage;