import { Button, Container, Form, Table } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import { getAddress, getWhereAddress } from "../../app/api/address";
import FormData from "form-data";
import { orderProduct } from "../../app/api/order";
import { useNavigate } from "react-router-dom";

const CheckAddress = () => {

    let cart = localStorage.getItem('cart') ? true : false;
    const [address, setAddress] = useState([]);
    const [activ, setActiv] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart) {
            navigate('/invoice');
        }
        getDataAddress()
    }, [])

    const getDataAddress = async () => {
        const data = await getAddress();
        setAddress(data.data);
    }

    const getAddresWhereId = async () => {
        var formData = new FormData();
        formData.append('delivery_fee', 15000);
        formData.append('delivery_address', activ);
        try {
            let res = await orderProduct(formData);
            localStorage.removeItem('cart');
            navigate('/invoice', { state: res.data._id });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <TopBar />
            <Container>
                <h1>Delivery Address</h1>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Detail</th>
                            <th>Check</th>
                        </tr>
                        {
                            address.map((item, i) => (
                                <tr key={`address-${i + 1}`}>
                                    <td>{item.nama}</td>
                                    <td>{`${item.kelurahan}, ${item.kecamatan}, ${item.kabupaten}, ${item.provinsi}, ${item.detail}`}</td>
                                    <td><Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="radio" id="check" name="activ" onChange={e => setActiv(item._id)} />
                                    </Form.Group></td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4}><Button className="btn btn-primary" onClick={getAddresWhereId}>Checkout</Button></td>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </>
    )
}

export default CheckAddress;