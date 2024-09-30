import React, { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import SingleCartItem from "./user/SingleCartItem";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/user.context";
import { createOrder } from "../Service/OrderService";
import Shoping from "../assets/Shoping.jpg";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);
  const [orderPlacedClicked, setOrderPlacedClicked] = useState(false);

  const { isLogin } = useContext(UserContext);

  const { userData } = useContext(UserContext);
  const [orderDetail, setOrderDetail] = useState({
    billingAddress: "",
    billingName: "",
    billingPhone: "",
    cartId: "",
    orderStatus: "",
    paymentStatus: "",
    userId: "",
  });

  function getTotalCartAmount() {
    let amount = 0;
    cartData.items.forEach((item) => {
      amount += item.totalPrice;
    });
    return amount;
  }

  async function handleOrderCreation() {
    if (
      orderDetail.billingAddress === undefined ||
      orderDetail.billingAddress.trim() === ""
    ) {
      toast.info("Please enter billing Address");
      return;
    }
    if (
      orderDetail.billingPhone === undefined ||
      orderDetail.billingPhone.trim() === ""
    ) {
      toast.info("Please enter billing Phone");
      return;
    }
    if (
      orderDetail.billingName === undefined ||
      orderDetail.billingName.trim() === ""
    ) {
      toast.info("Please enter billing Name");
      return;
    }
    orderDetail.orderStatus = "PENDING";
    orderDetail.paymentStatus = "NOT PAID";
    orderDetail.cartId = cartData.cartId;
    orderDetail.userId = userData.user.userId;
    console.log(orderDetail);

    try {
      const data = await createOrder(orderDetail);
      toast.success("Order created successfully");
      setCartData({
        ...cartData,
        items: [],
      });
    } catch (error) {
      toast.error("Error occured while creating the order");
    }
  }

  const orderFormView = () => {
    return (
      <>
        <Form>
          <Form.Group>
            <Form.Label>Billing Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={orderDetail.billingName}
              onChange={(event) => {
                setOrderDetail({
                  ...orderDetail,
                  billingName: event.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Billing Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Phone"
              value={orderDetail.billingPhone}
              onChange={(event) => {
                setOrderDetail({
                  ...orderDetail,
                  billingPhone: event.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              as={"textarea"}
              rows={6}
              placeholder="Enter your Address"
              value={orderDetail.billingAddress}
              onChange={(event) => {
                setOrderDetail({
                  ...orderDetail,
                  billingAddress: event.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Container className="d-grid mt-3">
            <Button
              variant="info"
              onClick={() => {
                handleOrderCreation();
              }}
            >
              Place Order & Proceed To payment
            </Button>
          </Container>
        </Form>
      </>
    );
  };

  const cartView = () => {
    return (
      <>
        <Card>
          <Card.Body>
            <Row className="px-5">
              <Col>
                <h3>Cart</h3>
              </Col>
              <Col className="text-end">
                <h3>{cartData.items.length}</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {cartData.items.map((cart) => {
                  return <SingleCartItem cart={cart}></SingleCartItem>;
                })}
              </Col>
            </Row>
            <Container className="px-5">
              <h3 className="text-end">
                Total Amount : {getTotalCartAmount()}
              </h3>
            </Container>
            <Container className="d-grid">
              {!orderPlacedClicked && (
                <Button
                  onClick={() => {
                    setOrderPlacedClicked(true);
                  }}
                >
                  Place Order
                </Button>
              )}
            </Container>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <Container fluid={orderPlacedClicked} className="animation">
      <Row>
        <Col>
          {cartData &&
            (cartData.items.length > 0 ? (
              cartView()
            ) : (
              <Alert className="mt-3">
                <Container className="text-center d-grid">
                  <img
                    src={Shoping}
                    alt=""
                    style={{
                      width: "70%",
                      margin: "auto",
                      height: "450px",
                    }}
                  />
                  <h2 className="my-3">Please Vists Store to Add Items</h2>
                  <Button as={Link} to="/store">
                    Store
                  </Button>
                </Container>
              </Alert>
            ))}
          {!isLogin && (
            <div
              style={{
                margin: "20px",
              }}
            >
              <Alert>
                <Container className="text-center d-grid">
                  <img
                    src={Shoping}
                    alt=""
                    style={{
                      width: "70%",
                      margin: "auto",
                      height: "450px",
                    }}
                  />
                  <h2 className="my-3">Please login To add Item </h2>
                  <Button as={Link} to="/login">
                    Login
                  </Button>
                </Container>
              </Alert>
            </div>
          )}
        </Col>
        {orderPlacedClicked && (
          <Col>
            <Card>
              <Card.Body>
                <h4>Fill The Form</h4>
                {orderFormView()}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Cart;
