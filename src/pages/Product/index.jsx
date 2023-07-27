import { Button, Container, Modal, Table, Form } from "react-bootstrap";
import TopBar from "../../components/TopBar";
import { useState } from "react";

const Product = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <TopBar />
            <Container>
                <h2>Products</h2>
                <Button variant="primary" className="my-3" onClick={handleShow}>
                    Add new product
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
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td><Button className="btn btn-danger mx-2">Delete</Button><Button className="btn btn-warning mx-2">Update</Button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td><Button className="btn btn-danger mx-2">Delete</Button><Button className="btn btn-warning mx-2">Update</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Data Product</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>name : </Form.Label>
                            <Form.Control type="text" name="name" placeholder="input data..." />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Product;