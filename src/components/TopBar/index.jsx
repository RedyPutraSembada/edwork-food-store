import { useEffect, useState } from "react";
import { logoutUser } from "../../app/api/auth";
import { userLogout } from "../../app/features/auth/actions";
import { getProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../app/api/categories";
import { cartGet } from "../../app/api/cart";
import { useNavigate } from "react-router-dom";

const { Navbar, Nav, NavDropdown, InputGroup, Form } = require("react-bootstrap");
const { PersonFill, Cart, Search } = require('react-bootstrap-icons');

const TopBar = () => {
    let dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : { user: null, token: null };
    const { dataCart } = useSelector(state => state);
    const [notifCart, setNorifCart] = useState(0);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState({
        q: ''
    });
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setNorifCart(dataCart.data.length);
    }, [dataCart])

    useEffect(() => {
        if (dataUserLogin.user !== null) {
            setName(<Navbar.Text>
                Signed in as: {dataUserLogin.user?.full_name}
            </Navbar.Text>);
            if (dataUserLogin.user?.role === "admin") {
                setAdmin(true);
            }
        } else {
            setName('')
        }
        getCategories();
        setNorifCart(dataCart.data.length);
        getCart()
    }, []);


    useEffect(() => {
        handleSearch();
    }, [search]);

    const getCart = async () => {
        let res = await cartGet();
        setNorifCart(res.data.length);
    }

    const getCategories = async () => {
        let res = await getCategory();
        setCategory(res.data);
    }

    const logout = async () => {
        let result = window.confirm("Apakah Anda yakin untuk logout?");
        if (result) {
            try {
                await logoutUser();
                let data = userLogout()
                dispatch(data);
                localStorage.removeItem('auth');
                window.location.reload();
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSearch = async () => {
        let res = await getProduct(search.q);
        let data = getAllProducts(res.data.data);
        dispatch(data);
    }

    const handleCategory = async (value) => {
        console.log(value);
        let res = await getProduct('', value);
        let data = getAllProducts(res.data.data);
        dispatch(data);
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
                            {
                                category.map((item, i) => (
                                    <NavDropdown.Item value={item.name} key={`category-${i + 1}`} onClick={e => handleCategory(item.name)}>{item.name}</NavDropdown.Item>
                                ))
                            }
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
                        onChange={(e) => setSearch({ ...search, q: e.target.value })}
                    />
                </InputGroup>
                <Navbar.Collapse className="justify-content-end">
                    {name}
                    <Nav>

                        {
                            name ?
                                <>
                                    <Nav.Link href="/carts" style={{ display: "flex" }}><Cart style={{ marginTop: "10px" }} /><div><div style={{ fontSize: "12px", backgroundColor: "red", justifyContent: "end", paddingRight: "3px", paddingLeft: "3px", borderRadius: "50%", color: "white" }}>{notifCart}</div></div></Nav.Link>
                                    <NavDropdown title={<PersonFill />}>
                                        <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="/pesanan">Pesanan</NavDropdown.Item>
                                        <NavDropdown.Item href="/delivery">Address</NavDropdown.Item>
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