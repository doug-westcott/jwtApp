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

import PublicProductDetail from './starter/public/ProductDetail'
import AdminProductDetail from './starter/user/admin/Product/ProductDetail'
import SearchProductsByName from './starter/public/Search/SearchProductsByName'
import Products from './starter/user/admin/Product/Products'

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

    const isPublic = () => user === null
    const isLoggedIn = () => user !== null
    const isAdmin = () => user?.role === "Admin"
    const isCustomer = () => user?.role === "Customer"
    const isSupport = () => user?.role === "Support"

    console.log(user, isPublic(), isLoggedIn(), isCustomer(), isAdmin(), isSupport())

    return (
        <UserContext.Provider value={{ user }}>
            <Router>
                <div className="container">
                    <Navbar bg="primary" variant="dark" expand="sm">
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {
                                    isPublic() &&
                                    <NavDropdown title="Search" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/searchproductsbyname">Search Products by Name</NavDropdown.Item>
                                    </NavDropdown>
                                }
                                {
                                    isCustomer() &&
                                    <>
                                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    </>
                                }
                                {
                                    isSupport() &&
                                    <>
                                        <Nav.Link as={Link} to="/">Support Stuff</Nav.Link>
                                    </>
                                }
                                {
                                    isAdmin() &&
                                    <NavDropdown title="Data" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/products">Products</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>
                        <Nav className="mr-auto navbar-right">
                            {
                                isPublic()
                                &&
                                <>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </>
                            }
                            {
                                isLoggedIn()
                                &&
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            }
                        </Nav>
                    </Navbar>

                    {
                        isPublic()
                        &&
                        <Switch>
                            <Route path="/register">
                                <Authenticate type="Register" set={setJwtUser} />
                            </Route>
                            <Route path="/login">
                                <Authenticate type="Login" set={setJwtUser} />
                            </Route>
                            <Route path="/productdetail/:id">
                                <PublicProductDetail />
                            </Route>
                            <Route path="/searchproductsbyname">
                                <SearchProductsByName />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    }
                    {
                        isLoggedIn()
                        &&
                        <Switch>
                            <Route path="/logout">
                                <Logout set={setJwtUser} />
                            </Route>
                        </Switch>
                    }
                    {
                        isCustomer()
                        &&
                        <Switch>
                            <Route path="/profile">
                                <Profile />
                            </Route>
                        </Switch>
                    }
                    {
                        isAdmin()
                        &&
                        <Switch>
                            <Route path="/productdetail/:id">
                                <AdminProductDetail />
                            </Route>
                            <Route path="/products">
                                <Products />
                            </Route>
                        </Switch>
                    }
                </div>
            </Router>
        </UserContext.Provider >
    )
}