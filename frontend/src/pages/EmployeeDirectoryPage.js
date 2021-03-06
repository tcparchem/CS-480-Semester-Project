import React from 'react'
import axios from 'axios'

import Table from 'react-bootstrap/Table'


class EmployeeDirectoryPage extends React.Component {
    state = { 
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getEmployees').then(res => {
            const employees = res.data[0];
            this.setState({data: employees})
        })
    }

    renderEmployee = (employee, index) => {
        if(employee == null) return

        return (
            <tr key={index}>  
                <td>{employee.ID}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
            </tr>
        )
    }

    render() {        
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(this.renderEmployee)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default EmployeeDirectoryPage;