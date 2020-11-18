import React from 'react'
import axios from 'axios'

import '../index.css'


import { Form, Button } from 'react-bootstrap'


class DeleteShiftPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {value: '', success: null}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    
    handleSubmit(event) {
        event.preventDefault();
        const shiftID = this.state.value

        this.submitData(shiftID)
    }


    submitData = (shiftID) => {
        axios.delete('http://localhost:3000/deleteShift?id=' + shiftID).then(res => {
            if(res.data.affectedRows === 0) this.setState({success: false})
            if(res.data.affectedRows === 1) this.setState({success: true})
        })
        .catch(function (error) {
            alert('Error sending API request. Internal Server Error')
            console.log(error)
        })
    }

    render() {
        const renderStatusLabel = () => {
            let success = this.state.success
            if(success === null) {
                return
            }

            if(success) {
                return <Form.Label className='greentext'>Successfully Deleted Shift</Form.Label>
            }

            if(success === false) {
                return <Form.Label className='redtext'>Error Deleting Shift</Form.Label>
            }
        }

        return (
            <div>
                <Form className='form' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formShiftID">
                        <Form.Label>Shift ID</Form.Label>
                        <Form.Control type="number" placeholder="Enter Shift ID to delete" value={this.state.value} onChange={this.handleChange} />
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

export default DeleteShiftPage;