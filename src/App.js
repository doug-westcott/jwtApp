import React, { useState } from 'react'
import 'bootswatch/dist/darkly/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import Authenticate from './public/Authenticate'
import Home from './public/Home'
import Profile from './user/Profile'
import Logout from './user/Logout'
import JwtUserContext from './JwtUserContext'
import db from './db';

export default function App() {

    const [jwtUser, setJwtUser] = useState(null)

    const set = jwtUser => {
        setJwtUser(jwtUser)
        db.setJwtUser(jwtUser)
    }

    const isLoggedIn = () => jwtUser !== null
    const isUser = () => jwtUser?.role === "ROLE_USER"
    const isAdmin = () => jwtUser?.role === "ROLE_ADMIN"

    console.log(jwtUser, isLoggedIn(), isUser(), isAdmin())

    return (
        <JwtUserContext.Provider value={{ jwtUser }}>
            <Router>
                <div className="container">
                    {/* <Navbar bg="primary" variant="dark">
                    <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavDropdown title="Admin">
                            <NavDropdown.Item as={Link} to={"/students"}>Students</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/products"}>Products</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/registers"}>Registrations</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Search">
                            <NavDropdown.Item as={Link} to={"/searchstudentsbyname"}>Students By Name</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchstudentsbybirthdate"}>Students By Birthdate</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchregistersbystudentname"}>Registers By Student Name</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={"/searchregistersbyproductsubject"}>Registers By Product Subject</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar> */}

                    <Navbar bg="primary" variant="dark" expand="sm">
                        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                {
                                    isUser() &&
                                    <Nav.Link as={Link} to="profile">Profile</Nav.Link>
                                }
                                {
                                    isAdmin() &&
                                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="students">Students</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="products">Products</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="registrations">Registration</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>
                        <Nav className="mr-auto navbar-right">
                            {
                                isLoggedIn()
                                    ?
                                    <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                                    :
                                    <>
                                        <Nav.Link as={Link} to="register">Register</Nav.Link>
                                        <Nav.Link as={Link} to="login">Login</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar>

                    <Switch>
                        <Route path="/register">
                            <Authenticate type="Register" set={set} />
                        </Route>
                        <Route path="/login">
                            <Authenticate type="Login" set={set} />
                        </Route>
                        <Route path="/logout">
                            <Logout set={set} />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/studentdetail/:id">
                            {/* <StudentDetail /> */}
                        </Route>
                        <Route path="/productdetail/:id">
                            {/* <ProductDetail /> */}
                        </Route>
                        <Route path="/registerdetail/:id">
                            {/* <RegisterDetail /> */}
                        </Route>
                        <Route path="/students">
                            {/* <Students /> */}
                        </Route>
                        <Route path="/registers">
                            {/* <Registers /> */}
                        </Route>
                        <Route path="/searchstudentsbyname">
                            {/* <SearchStudentsByName /> */}
                        </Route>
                        <Route path="/searchregistersbystudentname">
                            {/* <SearchRegistersByStudentName /> */}
                        </Route>
                        <Route path="/searchregistersbyproductsubject">
                            {/* <SearchRegistersByProductSubject /> */}
                        </Route>
                        <Route path="/searchstudentsbybirthdate">
                            {/* <SearchStudentsByBirthdate /> */}
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </JwtUserContext.Provider>
    )
}