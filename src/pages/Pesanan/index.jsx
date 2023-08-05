import { Button, Container, Table } from "react-bootstrap"
import TopBar from "../../components/TopBar"
import { useEffect, useState } from "react"
import { getOrderProduct, updateStatusProduct } from "../../app/api/order";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const Pesanan = () => {
    let dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : { user: null, token: null };
    const [pesanan, setPesanan] = useState([]);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getDataPesanan();
        if (dataUserLogin.user?.role === "admin") {
            setAdmin(true);
        }
    }, []);

    const getDataPesanan = async () => {
        let res = await getOrderProduct();
        setPesanan(res.data.data);
    }

    const moveToInvoice = (id) => {
        navigate('/invoice', { state: id })
    }

    const updateStatus = async (id, value) => {
        let formData = new FormData();
        formData.append('status', value)
        try {
            let res = await updateStatusProduct(id, formData);
            setPesanan(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TopBar />
            <Container>
                <h1>Pesanan</h1>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            {
                                admin ? <th>Name</th> : ''
                            }
                            <th>Status</th>
                            <th>Order Items</th>
                            <th>Invoice</th>
                            {
                                admin ? <th>Set Status Order</th> : ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pesanan.map((item, i) => (
                                <tr key={`order-${i + 1}`}>
                                    <td>#{item.order_number}</td>
                                    {
                                        admin ? <td>{item.user.full_name}</td> : ''
                                    }
                                    <td>{item.status}</td>
                                    <td>
                                        {
                                            item.order_items.map((tem, j) => (
                                                <ul key={`items-${j + 1}`}>
                                                    <li>{tem.name}</li>
                                                </ul>

                                            ))
                                        }
                                    </td>
                                    <td><Button className="btn btn-primary" onClick={(e) => moveToInvoice(item._id)} >Invoice</Button></td>
                                    {
                                        admin ? <td>
                                            <Button className="btn btn-warning mx-1" onClick={(e) => updateStatus(item._id, 'processing')} >Processing</Button>
                                            <Button className="btn btn-info mx-1" onClick={(e) => updateStatus(item._id, 'in_delivery')} >In Delivery</Button>
                                            <Button className="btn btn-success mx-1" onClick={(e) => updateStatus(item._id, 'delivered')} >Delivered</Button>
                                        </td> : ''
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Pesanan;