import { Button, Container, Modal, Table, Form, Alert } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../../app/api/categories";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const Category = () => {
    const [show, setShow] = useState(false);
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    const [dataCategory, setDataCategory] = useState([]);
    const [models, setModels] = useState({});
    const [value, setValue] = useState('');
    const [notif, setNotif] = useState('');
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (dataUserLogin === null || dataUserLogin.user.role !== "admin") {
            navigate('/');
        }
        getCategories();
    }, []);

    const getCategories = async () => {
        let res = await getCategory();
        setDataCategory(res.data);
    }

    const confirmDelete = async (id) => {
        let result = window.confirm("Apakah Anda yakin untuk menghapus");
        if (result) {
            await deleteCategory(id);
            window.location.reload()
        }
    }

    const optionModels = (option, id = '0', value = '') => {
        if (option === 'input') {
            setModels({
                ...models,
                option: 'input',
                title: 'Add New Data Category',
                value: value
            });
            handleShow();
        } else if (option === 'update') {
            setModels({
                ...models,
                option: 'update',
                title: 'Update Data Category',
                id: id,
                value: value
            });
            handleShow();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', value);
        if (models.option === 'input') {
            let res = await createCategory(formData);
            if (res.data.error === 1) {
                await setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.fields.name.message}</Alert.Heading>
                </Alert>)
                setModels({});
            } else {
                setNotif('');
                setModels({});
                window.location.reload();
            }
        } else if (models.option === 'update') {
            let res = await updateCategory(models.id, formData);
            if (res.data.error === 1) {
                await setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.fields.name.message}</Alert.Heading>
                </Alert>)
                setModels({});
            } else {
                setNotif('');
                setModels({});
                window.location.reload();
            }
        }
    }

    return (
        <>
            <TopBar />
            {notif}
            <Container>
                <h2>Categories</h2>
                <Button variant="primary" className="my-3" onClick={event => optionModels('input')}>
                    Add new category
                </Button>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataCategory.map((item, i) => (
                                <tr key={`tags-${i + 1}`}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td><Button className="btn btn-danger mx-2" onClick={event => confirmDelete(item._id)}>Delete</Button><Button className="btn btn-warning mx-2" onClick={event => optionModels('update', item._id, item.name)}>Update</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{models.title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category : </Form.Label>
                            <Form.Control type="text" name="name" placeholder="input data..." defaultValue={models.value} onChange={e => setValue(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Category;