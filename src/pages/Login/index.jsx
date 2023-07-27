import { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import * as Validator from 'validatorjs';
import { userLogin } from "../../app/features/auth/actions";
import { loginUser } from "../../app/api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const [alert, setAlert] = useState('');

    const handleError = async (validation) => {
        validation.passes();
        if (Object.keys(validation.errors.errors).length !== 0) {
            await setError({
                ...error,
                email: <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{validation.errors.get('email')[0]}</span>,
                password: <span style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>{validation.errors.get('password')[0]}</span>,
            });
        } else {
            setError({});
            var formData = new FormData();
            formData.append("email", value.email);
            formData.append("password", value.password);
            try {
                let response = await loginUser(formData);
                let dataUserLogin = userLogin(response.data);
                if (!dataUserLogin.payload.error) {
                    setAlert('');
                    dispatch(dataUserLogin);
                    const { type, ...payload } = dataUserLogin;
                    let data = {
                        user: payload.payload.user,
                        token: payload.payload.token
                    }
                    localStorage.setItem('auth', JSON.stringify(data));
                    console.log(data);
                    navigate('/');
                } else {
                    await setAlert(<Alert variant="danger">
                        <Alert.Heading>{dataUserLogin.payload.message}</Alert.Heading>
                    </Alert>);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let rules = {
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
        <>
            {alert}
            <Card style={{ width: '400px', height: "300px", marginTop: "15%", marginRight: "10px", }} className="mx-auto">
                <div style={{ backgroundColor: "gray", width: "100%", height: "50px" }} className="rounded-top text-center"><h2>Login</h2></div>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleInput} type="email" name="email" placeholder="Enter email" />
                            {error.email}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleInput} type="password" name="password" placeholder="Password" />
                            {error.password}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
                <div className="text-center">
                    <p>don't have account? <a href="/register" style={{ textDecoration: "none" }}>Register</a></p>
                </div>
            </Card>
        </>
    )
}

export default Login;