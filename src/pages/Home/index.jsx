import { Alert, Button, Card, Col, Container, Modal, Row, Table } from "react-bootstrap";
import Slider from "../../components/Slider";
import TopBar from "../../components/TopBar";
import Footer from "../../components/Footer";
import Tags from "../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";
import { Cart } from "react-bootstrap-icons";
import { cartUpdate } from "../../app/api/cart";
import { getAllCart } from "../../app/features/cart/actions";
import Paginat from "../../components/Paginat";
import { getUserToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { dataProduct, dataCart } = useSelector(state => state);
    const dispatch = useDispatch();
    const getUser = getUserToken();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({
        image_url: '',
        name: '',
        description: '',
        price: '',
        category: {},
        tags: [],
    })

    useEffect(() => {
        getDataProducts();
    }, [])

    useEffect(() => {
        pushDataCart()
    }, [dataCart.data])

    const handleClose = () => setShowModal(false);
    const handleShow = (item) => {
        setDataModal(item)
        setShowModal(true)
    };

    const insertCart = async (value) => {
        if (!getUser) {
            navigate('/login');
            return
        }
        setShow(true);
        let arr = [...dataCart.data]
        const cartIndex = arr.findIndex(el => el.product._id === value._id);
        if (cartIndex > -1) {
            arr[cartIndex].qty += 1
        } else {
            arr.push({
                product: value,
                qty: 1
            })
        }
        dispatch(getAllCart(arr))
    }

    const pushDataCart = async () => {
        if (dataCart.data.length !== 0) {
            let formData = {
                items: dataCart.data
            };
            let res = await cartUpdate(formData);
            localStorage.setItem('cart', JSON.stringify(res.data));
        }
    }




    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const getDataProducts = async () => {
        try {
            let res = await getProduct();
            let data = getAllProducts(res.data.data);
            dispatch(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <TopBar />
            <Container style={{
                minHeight: "100%",
                position: "relative"
            }}>
                <Slider />
                <Alert show={show} className="mt-2" variant="success">
                    <Alert.Heading>My Alert</Alert.Heading>
                    <p>
                        Data telah di tambahkan ke Cart Items
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close me
                        </Button>
                    </div>
                </Alert>
                <Tags />
                <Row xs={1} md={3} lg={4} className="g-4">
                    {
                        dataProduct.data.map((item, i) => (
                            <Col style={{ display: "flex", justifyContent: "center" }} key={`card-${i + 1}`}>
                                <Card style={{ width: '18rem', marginTop: "10px", marginRight: "10px" }}>
                                    <Card.Img variant="top" src={`http://localhost:3000/images/${item.image_url}`} width={200} height={200} onClick={(e) => handleShow(item)} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {
                                                item.tags.map((tem, j) => (
                                                    <span className="px-2" style={{ backgroundColor: "gray", paddingTop: '3px', paddingBottom: '3px', borderRadius: '5px', marginRight: '1px' }} key={`tag-${j + 1}`}>{tem.name}</span>
                                                ))
                                            }
                                            <br />{item.description}<br />
                                            {rupiah(item.price)}
                                        </Card.Text>
                                        <Button variant="primary" onClick={e => insertCart(item)}><Cart /></Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Paginat />
            </Container >
            <Footer />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Image</td>
                                <td><img src={`http://localhost:3000/images/${dataModal.image_url}`} width={200} height={200} alt="cover" /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{dataModal?.name}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{dataModal?.description}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{dataModal?.price}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{dataModal?.category.name}</td>
                            </tr>
                            <tr>
                                <td>Tags</td>
                                <td>
                                    <ul>
                                        {
                                            dataModal?.tags.map((item, i) => (
                                                <li key={`tags-${i + 1}`}>{item.name}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="primary" className="d-flex justify-content-end" onClick={e => insertCart(dataModal)}><Cart /></Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Home;