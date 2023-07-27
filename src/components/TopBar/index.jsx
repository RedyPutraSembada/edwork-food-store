import { useEffect, useState } from "react";
import { logoutUser } from "../../app/api/auth";
import { userLogout } from "../../app/features/auth/actions";

const { Navbar, Nav, NavDropdown, InputGroup, Form } = require("react-bootstrap");
const { PersonFill, Cart, Search } = require('react-bootstrap-icons');

const TopBar = () => {
    let dataUserLogin = JSON.parse(localStorage.getItem('auth'));
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (dataUserLogin !== null) {
            setName(<Navbar.Text>
                Signed in as: {dataUserLogin.user.full_name}
            </Navbar.Text>);
            if (dataUserLogin.user.role === "admin") {
                setAdmin(true);
            }
        }
    }, []);

    const logout = async () => {
        let result = window.confirm("Apakah Anda yakin untuk logout?");
        if (result) {
            try {
                await logoutUser();
                userLogout();
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="secondary" data-bs-theme="dark" className="px-5 py-3">
                <Navbar.Brand href="/">Food Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        </NavDropdown>
                        {
                            admin ? <NavDropdown title="Input Data" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/products">Product</NavDropdown.Item>
                                <NavDropdown.Item href="/categories">Category</NavDropdown.Item>
                                <NavDropdown.Item href="/tags">Tag</NavDropdown.Item>
                            </NavDropdown> : ''
                        }
                    </Nav>
                </Navbar.Collapse>
                <InputGroup className="px-4">
                    <InputGroup.Text><Search /></InputGroup.Text>
                    <Form.Control
                        name="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </InputGroup>
                <Navbar.Collapse className="justify-content-end">
                    {name}
                    <Nav>

                        {
                            name ?
                                <>
                                    <Nav.Link href="#link"><Cart /></Nav.Link>
                                    <NavDropdown title={<PersonFill />}>
                                        <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Invoice</NavDropdown.Item>
                                        <NavDropdown.Item href="#">Address</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                : ''
                        }
                        {
                            name ? <Nav.Link onClick={logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </>
    )
}

export default TopBar;