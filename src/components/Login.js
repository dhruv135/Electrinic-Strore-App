import React, { useState, useContext } from "react";
import Base from "./Base";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../Service/user.service";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const userContext = useContext(UserContext);

  const redirect = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errorData, setErrorData] = useState({
    isError: false,
    errorMessage: null,
  });

  function handleChange(event, property) {
    setLoginData({
      ...loginData,
      [property]: event.target.value,
    });
  }

  function handleReset() {
    setLoginData({
      email: "",
      password: "",
    });
    setErrorData({
      isError: false,
      errorMessage: null,
    });
    setLoading(false);
  }

  function submitForm(event) {
    event.preventDefault();
    if (loginData.email === undefined || loginData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (loginData.password === undefined || loginData.password.trim() === "") {
      toast.error("password is required");
      return;
    }
    console.log(loginData);
    setLoading(true);
    loginUser(loginData)
      .then((data) => {
        console.log(data);
        toast.success("user logged in successfully");
        setErrorData({
          errorMessage: null,
          isError: false,
        });

        userContext.login(data);
        console.log(userContext);
        //userContext.setIsLogin(true);

        redirect("/users/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
        setErrorData({
          errorMessage: "Some error occured",
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const loginForm = () => {
    return (
      <Container className="my-5 mb-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <h3 className="text-uppercase text-center">Login</h3>
                <form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your email"
                      value={loginData.email}
                      onChange={(event) => {
                        handleChange(event, "email");
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your password"
                      value={loginData.password}
                      onChange={(event) => {
                        handleChange(event, "password");
                      }}
                    />
                  </Form.Group>

                  <Container className="text-center">
                    {/* <p>
                    Forget Password <NavLink to="/forget">Click Here</NavLink>
                  </p> */}
                    <p>
                      Already Register{" "}
                      <NavLink to="/forget">Click Here</NavLink>
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button type="submit" variant="success">
                      <Spinner
                        animation="border"
                        size="sm"
                        hidden={!loading}
                      ></Spinner>
                      <span hidden={!loading}>...Please Wait</span>
                      <span hidden={loading}>Login</span>
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="ms-3"
                      variant="danger"
                    >
                      reset
                    </Button>
                  </Container>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Base
      title="Here You can Login"
      description="Here You can Login With Your Correct Credentials"
    >
      {loginForm()}
    </Base>
  );
}

export default Login;
