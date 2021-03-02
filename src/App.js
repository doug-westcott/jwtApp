import React from 'react'
import 'bootswatch/dist/darkly/bootstrap.min.css'
import Students from './Student/Students'
import Courses from './Course/Courses'
import StudentDetail from './Student/StudentDetail'
import CourseDetail from './Course/CourseDetail'
import RegisterDetail from './Register/RegisterDetail'
import Registers from './Register/Registers'
import SearchStudentsByName from './Search/SearchStudentsByName'
import SearchRegistersByStudentName from './Search/SearchRegistersByStudentName'
import SearchRegistersByCourseSubject from './Search/SearchRegistersByCourseSubject'
import SearchStudentsByBirthdate from './Search/SearchStudentsByBirthdate'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div className="container">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavDropdown title="Admin">
                            <NavDropdown.Item as={Link} to={"/students"}>Students</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/courses"}>Courses</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/registers"}>Registrations</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Search">
                            <NavDropdown.Item as={Link} to={"/searchstudentsbyname"}>Students By Name</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchstudentsbybirthdate"}>Students By Birthdate</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchregistersbystudentname"}>Registers By Student Name</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchregistersbycoursesubject"}>Registers By Course Subject</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar>

                <Switch>
                <Route path="/studentdetail/:id">
                        <StudentDetail />
                    </Route>
                    <Route path="/coursedetail/:id">
                        <CourseDetail />
                    </Route>
                    <Route path="/registerdetail/:id">
                        <RegisterDetail />
                    </Route>
                    <Route path="/students">
                        <Students />
                    </Route>
                    <Route path="/registers">
                        <Registers />
                    </Route>
                    <Route path="/searchstudentsbyname">
                        <SearchStudentsByName />
                    </Route>
                    <Route path="/searchregistersbystudentname">
                        <SearchRegistersByStudentName />
                    </Route>
                    <Route path="/searchregistersbycoursesubject">
                        <SearchRegistersByCourseSubject />
                    </Route>
                    <Route path="/searchstudentsbybirthdate">
                        <SearchStudentsByBirthdate />
                    </Route>
                    <Route path="/">
                        <Courses />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}