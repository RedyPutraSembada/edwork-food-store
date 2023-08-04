import { Button, Container, Table } from "react-bootstrap"
import TopBar from "../../components/TopBar"
import { useEffect, useState } from "react"
import { getOrderProduct } from "../../app/api/order";
import { useNavigate } from "react-router-dom";

const Pesanan = () => {
    const [pesanan, setPesanan] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDataPesanan();
    }, []);

    const getDataPesanan = async () => {
        let res = await getOrderProduct();
        setPesanan(res.data.data);
    }

    const moveToInvoice = (id) => {
        navigate('/invoice', { state: id })
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
                            <th>Status</th>
                            <th>Order Items</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pesanan.map((item, i) => (
                                <tr key={`order-${i + 1}`}>
                                    <td>#{item.order_number}</td>
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