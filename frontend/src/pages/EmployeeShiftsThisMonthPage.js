import React from 'react'
import axios from 'axios'

import * as ReactBootStrap from "react-bootstrap";


class EmployeeShiftsThisMonthPage extends React.Component {
    state = { 
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getShiftsThisMonth').then(res => {
            const allShifts = res.data[0];
            this.setState({data: allShifts})
        })
    }

    renderShifts = (shifts, index) => {
        if(shifts == null) return

        var startTime = new Date(shifts.startTime)
        var endTime = new Date(shifts.endTime)

        return (
            <tr key={index}>  
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
        return (
            <div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
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
                </ReactBootStrap.Table>
            </div>
        );
    }
}

export default EmployeeShiftsThisMonthPage;