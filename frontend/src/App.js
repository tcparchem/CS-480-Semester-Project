import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EmployeeDirectoryPage from './pages/EmployeeDirectoryPage'

class App extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = {
      title: 'Employee Dashboard',
      headerLinks: [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about'},
        { title: 'Contact', path: '/contact'},
        { title: 'Resume', path: '/resume'}
      ],
      home: {
        title: 'Employee Dashboard',
        subTitle: 'Manager View',
        subText: 'Use the following tabs to retrieve information about employees and their shifts'
      },
      employeelist: {
        title: 'List of Employees',
      },
      resume: {
        title: 'My Resume',
      },
      contact: {
        title: 'Let\'s Talk',
      }
    }
  }
  
  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <Navbar.Brand>Company Portal</Navbar.Brand>

            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/employeedirectory">Employee Directory</Link>
                <Link className="nav-link" to="/resume">Resume</Link>
                <Link className="nav-link" to="/contact">Contact</Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar>
          
          <Route path="/" exact render={() => <HomePage title={this.state.home.title} subTitle={this.state.home.subTitle} subText={this.state.home.subText} />} />
          <Route path="/employeedirectory" exact render={() => <EmployeeDirectoryPage />} />
          <Footer />
          
        </Container>
      </Router>
    );
  }
}

export default App;
