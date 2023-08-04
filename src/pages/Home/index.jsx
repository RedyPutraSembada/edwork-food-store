import { Button, Card, Col, Container, Row } from "react-bootstrap";
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

const Home = () => {
    const { dataProduct } = useSelector(state => state);
    const [arrayCart, setArrayCart] = useState([]);
    const [objectCart, setObjectCart] = useState({
        items: []
    });
    const dispatch = useDispatch();
    window.tags = []

    useEffect(() => {
        getDataProducts();
    }, [])

    useEffect(() => {
        setObjectCart({ ...objectCart, items: arrayCart });
    }, [arrayCart])

    useEffect(() => {
        pushDataCart();
    }, [objectCart])

    const insertCart = async (value) => {
        let tem = {
            product: value,
            qty: 1
        }
        await setArrayCart(oldArray => [...oldArray, tem]);
    }

    const pushDataCart = async () => {
        if (objectCart.items.length !== 0) {
            let formData = JSON.stringify(objectCart);
            let res = await cartUpdate(formData);
            localStorage.setItem('cart', JSON.stringify(res.data));
            let data = getAllCart(res.data);
            dispatch(data);
            console.log('update');
        }
        // dispatch(res.data)
    }


    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    // useEffect(() => {
    //     getProductWhereTag();
    // }, [search]);

    // const getProductWhereTag = async () => {
    //     for (var i = 0; i < search.length; i++) {
    //         window.tags = search[i];
    //     }
    //     console.log(window.tags);
    //     let res = await getProduct('', '', window.tags);
    //     let data = getAllProducts(res.data.data);
    //     console.log(data);
    // }

    const getDataProducts = async () => {
        try {
            let res = await getProduct();
            let data = getAllProducts(res.data.data);
            dispatch(data);
        } catch (err) {
            console.log(err);
        }
    }

    // const handleTags = (tag) => {
    //     const elementExists = search.includes(tag);
    //     if (!elementExists) {
    //         setSearch(oldArray => [...oldArray, tag]);
    //     } else {
    //         setSearch(oldValues => {
    //             return oldValues.filter(data => data !== tag);
    //         })
    //     }
    // }

    return (
        <>
            <TopBar />
            <Container style={{
                minHeight: "100%",
                position: "relative"
            }}>
                <Slider />
                <Tags />
                <Row xs={1} md={3} lg={4} className="g-4">
                    {
                        dataProduct.data.map((item, i) => (
                            <Col style={{ display: "flex", justifyContent: "center" }} key={`card-${i + 1}`}>
                                <Card style={{ width: '18rem', marginTop: "10px", marginRight: "10px" }}>
                                    <Card.Img variant="top" src={`http://localhost:3000/images/${item.image_url}`} width={200} height={200} />
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
        </>
    )
}

export default Home;