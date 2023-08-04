import { useState } from "react";
import TopBar from "../../components/TopBar";
import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getInvoice } from "../../app/api/invoice";

const Invoice = () => {
    const [invoice, setInvoice] = useState({});
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getInvoiceById(state)
        if (state === null) {
            navigate('/pesanan')
        }
    }, []);

    const getInvoiceById = async (id) => {
        let res = await getInvoice(id);
        console.log(res.data);
        setInvoice(res.data)
    }

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return (
        <>
            <TopBar />
            <Container>
                <h1>Invoice</h1>
                <Table>
                    <tbody>
                        <tr>
                            <td>Status</td>
                            <td>{invoice.payment_status}</td>
                        </tr>
                        <tr>
                            <td>Order ID</td>
                            <td># {invoice.order?.order_number}</td>
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>{rupiah(invoice.sub_total)}</td>
                        </tr>
                        <tr>
                            <td>Billed To</td>
                            <td>{invoice.user?.full_name}<br />{invoice.user?.email}<br /><br />{invoice.delivery_address?.kelurahan}, {invoice.delivery_address?.kecamatan}, {invoice.delivery_address?.kabupaten}, {invoice.delivery_address?.provinsi}</td>
                        </tr>
                        <tr>
                            <td>Payment To</td>
                            <td>Redy Putra <br />redy@gmail.com<br />BCA<br />xxxxx-xxxxxx-334-34</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Invoice;