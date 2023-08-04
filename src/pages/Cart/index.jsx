import { Button, Container, Table } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useMemo, useState } from "react";
import { cartGet, cartUpdate } from "../../app/api/cart";
import { useEffect } from "react";
import Item from "../../components/Item";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [objectCart, setObjectCart] = useState({
        items: []
    });
    const navigate = useNavigate();
    const conCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : '';
    const calculation = useMemo(() => cart.reduce((prevValue, nextItem) => prevValue + (nextItem.qty * nextItem.price), 0), [cart]);

    // const total =  cart.reduce((prevValue, nextItem) => prevValue + (nextItem.qty * nextItem.price), 0);

    useEffect(() => {
        if (conCart === '') {
            navigate('/check-address');
        }
        getCart();
    }, []);

    useEffect(() => {
        console.log(cart);
    }, [cart])

    useEffect(() => {
        setObjectCart({ ...objectCart, items: cart });
    }, [cart])

    const updateCart = async () => {
        console.log(objectCart);
        let formData = JSON.stringify(objectCart);
        await cartUpdate(formData);
        localStorage.setItem('cart', JSON.stringify(''));
        navigate('/check-address');
    }

    const getCart = async () => {
        let res = await cartGet();
        setCart(res.data);
    }

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }


    //* Update QTY
    const getQty = (qty, id) => {
        let neWCart = [...cart];
        const cartindex = neWCart.findIndex(el => el._id === id);
        if (cartindex > -1) {
            neWCart[cartindex].qty = qty;
        }
        setCart(neWCart);
    }

    return (
        <>
            <TopBar />
            <Container >
                <h1>Cart</h1>
                <h2>Sub Total: {rupiah(calculation)}</h2>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Gambar</th>
                            <th>Barang</th>
                            <th>Harga</th>
                            <th>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, i) => (
                                <Item item={item} key={i + 1} getQty={getQty} />
                            ))
                        }
                        <tr>
                            <td colSpan={4}><Button className="btn btn-primary" onClick={updateCart}>Checkout</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Cart;