import { Button, Container, Table } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useMemo, } from "react";
import { cartUpdate } from "../../app/api/cart";
import { useEffect } from "react";
import Item from "../../components/Item";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart } from "../../app/features/cart/actions";

const Cart = () => {
    const { dataCart } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const conCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : '';
    const calculation = useMemo(() => dataCart.data.reduce((prevValue, nextItem) => prevValue + (nextItem.qty * nextItem.price), 0), [dataCart]);

    useEffect(() => {
        if (conCart === '') {
            navigate('/check-address');
        }
    }, []);

    const chekout = async () => {
        let formData = {
            items: dataCart.data
        }
        await cartUpdate(formData);
        localStorage.setItem('cart', JSON.stringify(''));
        navigate('/check-address');

    }

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }


    //* Update QTY
    const getQty = (qty, id) => {
        let newCart = [...dataCart.data];
        const cartindex = newCart.findIndex(el => el._id === id);
        if (cartindex > -1) {
            newCart[cartindex].qty = qty;
        }
        updateCart(newCart);
    }

    const deleteData = async (value) => {
        let newCart = [...dataCart.data];
        const cartIndex = newCart.findIndex(el => el._id === value._id);
        if (cartIndex > -1) {
            //* hapus pada index ke cartIndex dan hapus 1 data
            newCart.splice(cartIndex, 1);
            updateCart(newCart);
        }
    }

    const updateCart = async (newCart) => {
        try {
            let formData = {
                items: newCart
            }
            let res = await cartUpdate(formData);
            dispatch(getAllCart(res.data));
        } catch (error) {
            console.error(error);
        }
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
                            <th>Delete From Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataCart.data.map((item, i) => (
                                <Item item={item} key={i + 1} getQty={getQty} deleteData={deleteData} />
                            ))
                        }
                        <tr>
                            <td colSpan={5}><Button className="btn btn-primary" onClick={chekout}>Checkout</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Cart;