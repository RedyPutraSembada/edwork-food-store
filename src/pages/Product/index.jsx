import { Button, Container, Modal, Table, Form, ListGroup, Alert } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProduct, showProduct, updateProduct } from "../../app/api/product";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../app/features/product/actions";
import { getCategory } from "../../app/api/categories";
import { getTag } from "../../app/api/tags";
import { useNavigate } from "react-router-dom";

const Product = () => {
    let { dataProduct } = useSelector(state => state);
    const [models, setModels] = useState({});
    const [image, setImage] = useState({});
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    const [dataTags, setDataTags] = useState([]);
    const [notif, setNotif] = useState('');
    const navigate = useNavigate();
    const [value, setValue] = useState({
        category: {
            name: null
        },
        tags: []
    });
    // const [dataById, setDataById] = useState({
    //     category: {
    //         name: null
    //     },
    //     tags: []
    // });
    const [select, setSelect] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataUserLogin === null || dataUserLogin.user.role !== "admin") {
            navigate('/');
        }
        getDataProducts();
        getCategories();
        getTags();
    }, []);

    const getDataProducts = async () => {
        try {
            let res = await getProduct();
            const data = getAllProducts(res.data.data);
            dispatch(data);
        } catch (error) {
            console.error(error);
        }
    }

    const optionModels = async (option, id = '0', value = '') => {
        if (option === 'input') {
            setModels({
                ...models,
                option: 'input',
                title: 'Add New Data Product',
                id: '0',
                value: value
            });
            setValue({
                category: {
                    name: null
                },
                tags: []
            });
            setSelect([]);
            handleShow();
        } else if (option === 'update') {
            setModels({
                ...models,
                option: 'update',
                title: 'Update Data Tag',
                id: id,
                value: value
            });
            let res = await showProduct(id);
            console.log(res.data);
            setValue(res.data);
            setSelect(res.data.tags.map((item, i) => item.name))
            handleShow();
        }
    }

    const getCategories = async () => {
        let res = await getCategory();
        setDataCategory(res.data);
    }

    const getTags = async () => {
        let res = await getTag();
        setDataTags(res.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('name', value.name);
        formData.append('category', value.category);
        formData.append('description', value.description);
        formData.append('price', value.price);
        for (var i = 0; i < select.length; i++) {
            formData.append('tags[]', select[i]);
        }
        formData.append('image', image);
        if (models.option === 'input') {
            let res = await createProduct(formData);
            if (res.data.error === 1) {
                setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.message}</Alert.Heading>
                </Alert>)
                setModels({});
                setSelect([]);
            } else {
                setNotif('');
                setSelect([]);
                setModels({});
                getDataProducts();
            }
        } else if (models.option === 'update') {
            let res = await updateProduct(models.id, formData);
            if (res.data.error === 1) {
                await setNotif(<Alert variant="danger">
                    <Alert.Heading>{res.data.fields.name.message}</Alert.Heading>
                </Alert>)
                setModels({});
            } else {
                setNotif('');
                setModels({});
                getDataProducts();
            }
        }
    }

    const handleInput = async (e) => {
        const newObject = { ...value, [e.target.name]: e.target.value }
        setValue(newObject);
    }

    const confirmDelete = async (id) => {
        let result = window.confirm("Apakah Anda yakin untuk menghapus");
        if (result) {
            await deleteProduct(id);
            getDataProducts();
        }
    }

    // const handleChangeSelect = async (e) => {
    //     console.log(e.target.selectedOptions);
    //     let v = Array.from(e.target.selectedOptions, option => option.value);
    //     setSelect(v);
    // }


    return (
        <>
            <TopBar />
            {notif}
            <Container>
                <h2>Products</h2>
                <Button variant="primary" className="my-3" onClick={event => optionModels('input')}>
                    Add new product
                </Button>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataProduct.data.map((item, i) => (
                                <tr key={`product-${i + 1}`}>
                                    <td>{i + 1}</td>
                                    <td><img src={`http://localhost:3000/images/${item.image_url}`} alt="cover" width={200} height={200} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <ul>
                                            <li>{item.category.name}</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {
                                                item.tags.map((tem, j) => (
                                                    <li key={`item-${j + 1}`}>{tem.name}</li>
                                                ))
                                            }
                                        </ul></td>
                                    <td><Button className="btn btn-danger mx-2" onClick={event => confirmDelete(item._id)}>Delete</Button><Button className="btn btn-warning mx-2" onClick={event => optionModels('update', item._id)}>Update</Button></td>
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
                            <Form.Label>Name : </Form.Label>
                            <Form.Control type="text" name="name" onChange={handleInput} defaultValue={models.option !== "input" ? value.name : ''} />
                            <Form.Label>Description : </Form.Label>
                            <Form.Control type="text" name="description" onChange={handleInput} defaultValue={models.option !== "input" ? value.description : ''} />
                            <Form.Label>Price : </Form.Label>
                            <Form.Control type="number" name="price" onChange={handleInput} defaultValue={models.option !== "input" ? value.price : ''} />
                            <Form.Label>Image : </Form.Label>
                            <Form.Control type="file" name="image" placeholder="input data..." onChange={(e) => setImage(e.target.files[0])} />
                            <Form.Select aria-label="Default select example" name="category" className="mt-3" onChange={handleInput}>
                                <option>Select Category</option>
                                {
                                    dataCategory.map((item, i) => (<option key={`item-${i + 1}`} selected={item.name === value.category.name ? true : false} value={item.name}>{item.name}</option>))
                                }
                            </Form.Select>
                            <Form.Control className="mt-3" as="select" multiple onChange={e => setSelect([].slice.call(e.target.selectedOptions).map(item => item.value))}>

                                {
                                    dataTags.map((item, i) => (<option selected={select.includes(item.name)} key={`item-${i + 1}`} value={item.name}>{item.name}</option>))
                                }
                            </Form.Control>
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

export default Product;