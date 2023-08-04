import { Alert, Button, Container, Form, Modal, Table } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import { createAddress, deleteAddress, getAddress, getWhereAddress, updateAddress } from "../../app/api/address";

const DeliveryAddress = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState([]);
    const [notif, setNotif] = useState('');
    const [models, setModels] = useState({});
    const [value, setValue] = useState({
        nama: '',
        kelurahan: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        detail: '',
    });

    useEffect(() => {
        getDeliveryAddress()
    }, []);

    const getDeliveryAddress = async () => {
        let res = await getAddress();
        setAddress(res.data);
    }

    const optionModels = async (option, id = '0') => {
        if (option === 'input') {
            setModels({
                ...models,
                option: 'input',
                title: 'Add New Data Delivery',
                id: '0',
            });
            setValue({
                nama: '',
                kelurahan: '',
                kecamatan: '',
                kabupaten: '',
                provinsi: '',
                detail: '',
            });
            handleShow();
        } else if (option === 'update') {
            setModels({
                ...models,
                option: 'update',
                title: 'Update Data Delivery',
                id: id,
            });
            let res = await getWhereAddress(id);
            console.log(res.data);
            setValue(res.data);
            handleShow();
        }
    }

    const confirmDelete = async (id) => {
        let result = window.confirm("Apakah Anda yakin untuk menghapus");
        if (result) {
            await deleteAddress(id);
            getDeliveryAddress();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('nama', value.nama);
        formData.append('kelurahan', value.kelurahan);
        formData.append('kecamatan', value.kecamatan);
        formData.append('kabupaten', value.kabupaten);
        formData.append('provinsi', value.provinsi);
        formData.append('detail', value.detail);
        if (models.option === 'input') {
            let res = await createAddress(formData);
            if (res.data.error === 1) {
                setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.message}</Alert.Heading>
                </Alert>)
                setModels({});
            } else {
                setNotif('');
                setModels({});
                getDeliveryAddress();
            }
        } else if (models.option === 'update') {
            let res = await updateAddress(models.id, formData);
            if (res.data.error === 1) {
                setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.fields.name.message}</Alert.Heading>
                </Alert>)
                setModels({});
            } else {
                setNotif('');
                setModels({});
                getDeliveryAddress();
            }
        }
    }

    const handleInput = async (e) => {
        const newObject = { ...value, [e.target.name]: e.target.value }
        setValue(newObject);
    }

    return (
        <>
            <TopBar />
            {
                notif
            }
            <Container>
                <h1>Delivery Address</h1>
                <Button variant="primary" className="my-3" onClick={event => optionModels('input')}>
                    Add new Address
                </Button>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            address.map((item, i) => (
                                <tr key={`alamat-${i + 1}`}>
                                    <td>{item.nama}</td>
                                    <td>{`${item.kelurahan} , ${item.kecamatan} , ${item.kabupaten} , ${item.provinsi} , ${item.detail}`}</td>
                                    <td><Button className="btn btn-danger mx-2" onClick={event => confirmDelete(item._id)}>Delete</Button>
                                        <Button className="btn btn-warning mx-2" onClick={event => optionModels('update', item._id)}>Update</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{models.title}</Modal.Title>
                </Modal.Header>
                <Form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name Address : </Form.Label>
                            <Form.Control type="text" name="nama" onChange={handleInput} defaultValue={models.option !== "input" ? value.nama : ''} />
                            <Form.Label>Kelurahan : </Form.Label>
                            <Form.Control type="text" name="kelurahan" onChange={handleInput} defaultValue={models.option !== "input" ? value.kelurahan : ''} />
                            <Form.Label>Kecamatan : </Form.Label>
                            <Form.Control type="text" name="kecamatan" onChange={handleInput} defaultValue={models.option !== "input" ? value.kecamatan : ''} />
                            <Form.Label>Kabupaten : </Form.Label>
                            <Form.Control type="text" name="kabupaten" onChange={handleInput} defaultValue={models.option !== "input" ? value.kabupaten : ''} />
                            <Form.Label>Provinsi : </Form.Label>
                            <Form.Control type="text" name="provinsi" onChange={handleInput} defaultValue={models.option !== "input" ? value.provinsi : ''} />
                            <Form.Label>Detail : </Form.Label>
                            <Form.Control as="textarea" name="detail" onChange={handleInput} rows={3} defaultValue={models.option !== "input" ? value.detail : ''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default DeliveryAddress;