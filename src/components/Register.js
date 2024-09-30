import React, { useState } from "react";
import Base from "./Base";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { registerUser } from "../Service/user.service";

function Register() {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  function submitForm(event) {
    event.preventDefault();
    if (data.name === undefined || data.name.trim() === "") {
      toast.error("Please Enter Name");
      return;
    }
    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Please Enter email");
      return;
    }
    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Please Enter password");
      return;
    }
    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("Please Enter.confirmPassword");
      return;
    }
    if (data.confirmPassword !== data.password) {
      toast.error("password and confirm password is not matching");
      return;
    }
    if (data.gender === undefined || data.gender.trim() === "") {
      toast.error("Please Enter gender");
      return;
    }
    if (data.about === undefined || data.about.trim() === "") {
      toast.error("Please Enter about");
      return;
    }

    setLoading(true);
    registerUser(data)
      .then((userData) => {
        console.log(userData);
        toast.success("User Created Successfully");
        clearData();
      })
      .catch((error) => {
        console.log(error);
        setErrorData({
          isError: true,
          errorMessage: error,
        });
        toast.error("Error Occured while creating the user");
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(data);
  }

  const [errorData, setErrorData] = useState({
    isError: false,
    errorMessage: null,
  });

  function handleChange(event, property) {
    setData({
      ...data,
      [property]: event.target.value,
    });
  }

  function clearData() {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      about: "",
      gender: "",
    });
    setErrorData({
      isError: false,
      errorMessage: null,
    });
  }

  function registerForm() {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Card className="mb-4 border m-3">
              <Card.Body>
                <h3 className="mb-3">Sign Up</h3>
                <form noValidate onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      value={data.name}
                      isInvalid={errorData.errorMessage?.response?.data?.name}
                      onChange={(event) => {
                        handleChange(event, "name");
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorMessage?.response?.data?.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      value={data.email}
                      isInvalid={errorData.errorMessage?.response?.data?.email}
                      onChange={(event) => {
                        handleChange(event, "email");
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorMessage?.response?.data?.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Your password"
                      value={data.password}
                      isInvalid={
                        errorData.errorMessage?.response?.data?.password
                      }
                      onChange={(event) => {
                        handleChange(event, "password");
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorMessage?.response?.data?.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>ReType Your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm Your password"
                      value={data.confirmPassword}
                      onChange={(event) => {
                        handleChange(event, "confirmPassword");
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Your Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label="male"
                        name="gender"
                        type={"radio"}
                        id={`gender`}
                        value={"male"}
                        checked={data.gender === "male"}
                        onChange={(event) => {
                          handleChange(event, "gender");
                        }}
                      />
                      <Form.Check
                        inline
                        label="female"
                        name="gender"
                        type={"radio"}
                        id={`gender`}
                        value={"female"}
                        checked={data.gender === "female"}
                        onChange={(event) => {
                          handleChange(event, "gender");
                        }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Write Somethig About Your Self</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows={6}
                      placeholder="Write Something Anout YourSelf"
                      value={data.about}
                      isInvalid={errorData.errorMessage?.response?.data?.about}
                      onChange={(event) => handleChange(event, "about")}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errorData.errorMessage?.response?.data?.abouts}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Container>
                    <p className="text-center">
                      Already Registerd <a href="/login">login</a>
                    </p>
                  </Container>
                  <Container className="text-center">
                    <Button
                      type="submit"
                      variant="primary"
                      className="text-upper"
                    >
                      {loading && (
                        <span>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Wait...
                        </span>
                      )}

                      {!loading && <span>Register</span>}
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2 text-upper"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Base
      title="Here You an register"
      description="Here You an make yourself register with our application"
    >
      {registerForm()}
    </Base>
  );
}

export default Register;
