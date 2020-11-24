import React from 'react'
import axios from 'axios'

import '../index.css'


import { Form, Button, Table } from 'react-bootstrap'


class RetrieveShiftsByTimePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            startTime: '',
            endTime: '',
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
        const startTime = this.state.startTime
        const endTime = this.state.endTime

        this.submitData(startTime, endTime)
    }


    submitData = (startTime, endTime) => {
        axios.get('http://localhost:3000/retrieveShiftsByTime?startTime=' + startTime + '&endTime=' + endTime).then(res => {
            const allShifts = res.data[0];
            this.setState({ data: allShifts })
            if (res.data[0].length === 0) this.setState({ success: false })
            if (res.data[0].length === 1) this.setState({ success: true })
        })
            .catch(function (error) {
                alert('Error sending API request. Internal Server Error')
                console.log(error)
            })
    }

    renderShifts = (shifts, index) => {
        if (shifts == null) return

        var startTime = new Date(shifts.startTime)
        var endTime = new Date(shifts.endTime)

        return (
            <tr key={index}>
                <td>{shifts.shiftID}</td>
                <td>{shifts.employeeID}</td>
                <td>{shifts.firstName}</td>
                <td>{shifts.lastName}</td>
                <td>{startTime.toString()}</td>
                <td>{endTime.toString()}</td>
                <td>{shifts.position}</td>
                <td>{shifts.location}</td>
            </tr>
        )
    }

    render() {
        const renderStatusLabel = () => {
            let success = this.state.success
            if (success === null) {
                return
            }

            if (success) {
                return <Form.Label className='greentext'>Results Found</Form.Label>
            }

            if (success === false) {
                return <Form.Label className='redtext'>No Results Found</Form.Label>
            }
        }

        return (
            <div>
                <Form className='form' onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="datetime-local" placeholder="Enter Start Time to Search" name='startTime' value={this.state.startTime} onChange={this.handleChange} />
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="datetime-local" placeholder="Enter End Time to Search" name='endTime' value={this.state.endTime} onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div>
                        {renderStatusLabel()}
                    </div>
                </Form>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Shift ID</th>
                                <th>Employee ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Position</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(this.renderShifts)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default RetrieveShiftsByTimePage;