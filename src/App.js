import React, { useState, useEffect } from 'react'
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
import Authenticate from './starter/public/Authenticate'
import Home from './starter/public/Home'
import Profile from './starter/user/Profile'
import Logout from './starter/user/Logout'
import UserContext from './UserContext'
import db from './db';

import ProductDetail from './starter/public/ProductDetail'

export default function App() {

    const [jwtUser, setJwtUser] = useState(db.getJwtUser())
    const [user, setUser] = useState(null)

    useEffect(() => (async () => {
        db.setJwtUser(jwtUser)
        let user = null
        if (jwtUser) {
            user = await db.Users.findOne(jwtUser.username)
            if (!user) {
                await db.Users.create(users => { }, { id: jwtUser.username, name: "", role: "Customer" })
                user = await db.Users.findOne(jwtUser.username)
            }
        }
        setUser(user)
    })(), [jwtUser])

    const isLoggedIn = () => user !== null
    const isAdmin = () => user?.role === "Admin"
    const isCustomer = () => user?.role === "Customer"
    // const isSupport = () => user?.role === "Support"

    console.log(user, isLoggedIn(), isCustomer(), isAdmin())

    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <div className="container">
                    <Navbar bg="primary" variant="dark" expand="sm">
                        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                {
                                    isCustomer() &&
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
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
                                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                    :
                                    <>
                                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar>

                    <Switch>
                        <Route path="/register">
                            <Authenticate type="Register" set={setJwtUser} />
                        </Route>
                        <Route path="/login">
                            <Authenticate type="Login" set={setJwtUser} />
                        </Route>
                        <Route path="/logout">
                            <Logout set={setJwtUser} />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/productdetail/:id">
                            <ProductDetail />
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
        </UserContext.Provider>
    )
}