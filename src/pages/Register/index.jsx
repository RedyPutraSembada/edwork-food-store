import FormData from "form-data";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { registerUser } from "../../app/api/auth";
import * as Validator from 'validatorjs';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const [error, setErr] = useState({});

    const [value, setValue] = useState({
        full_name: '',
        email: '',
        password: ''
    });

    const handleError = async (validation) => {
        validation.passes();
        if (Object.keys(validation.errors.errors).length !== 0) {
            await setErr({
                ...error,
                full_name: <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{validation.errors.get('full_name')[0]}</span>,
                email: <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{validation.errors.get('email')[0]}</span>,
                password: <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{validation.errors.get('password')[0]}</span>,
            });
        } else {
            setErr({});
            var formData = new FormData();
            formData.append("full_name", value.full_name);
            formData.append("email", value.email);
            formData.append("password", value.password);
            try {
                let response = await registerUser(formData);
                if (response.status === 200) {
                    navigate('/login', { state: { status: "success", message: "You have successfully registered, please login" } });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let rules = {
            full_name: 'required',
            email: 'required',
            password: 'required',
        }
        let validation = new Validator(value, rules);
        handleError(validation);
    }

    const handleInput = async (e) => {
        const newObject = await { ...value, [e.target.name]: e.target.value }
        setValue(newObject);
    }

    return (
        <Card style={{ width: '400px', height: "500px", marginTop: "15%", marginRight: "10px", }} className="mx-auto">
            <div style={{ backgroundColor: "gray", width: "100%", height: "50px" }} className="rounded-top text-center"><h2>Registrasi</h2></div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="full_name" placeholder="Enter full name" onChange={handleInput} />
                        {error.full_name}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleInput} />
                        {error.email}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleInput} />
                        {error.password}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            <div className="text-center">
                <p>already have an account? <a href="/login" style={{ textDecoration: "none" }}>Login</a></p>
            </div>
        </Card>
    )
}

export default Register;