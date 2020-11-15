import React from 'react'
import axios from 'axios'

import Hero from '../components/Hero'
import Table from 'react-bootstrap/Table'


class EmployeeListPage extends React.Component {
    state = { 
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/getEmployees').then(res => {
            const employees = res.data;
            this.setState({data: employees})
        })
    }

    renderEmployee = (employee, index) => {
        return (
            <tr> key={index} 
                <td>employee.ID</td>
                <td>employee.firstName</td>
                <td>employee.lastName</td>
            </tr>
        )
    }

    render() {
        
        console.log(this.state.data);
        
        return (
            <div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                </ReactBootStrap.Table>
            </div>
        );
    }
}

export default EmployeeListPage;