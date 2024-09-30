import React, { useContext, useEffect, useState } from "react";
import { getOrdersOfUser } from "../../Service/OrderService";
import UserContext from "../../context/user.context";
import SingleOrderView from "../SingleOrderView";
import {
  Card,
  Col,
  Row,
  Modal,
  Button,
  Table,
  ListGroup,
  ListGroupItem,
  Badge,
  Container,
  Form,
} from "react-bootstrap";

import { getProductImageUrl } from "../../Service/helper.service";

function UserOrders() {
  const [orders, setOrders] = useState(null);
  const { userData, isLogin } = useContext(UserContext);
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState(undefined);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatDate(time) {
    return new Date(time).toLocaleDateString();
  }

  useEffect(() => {
    loadOrdersOfUser();
  }, []);

  function viewOrderDetails(event, order) {
    console.log("viewOrderDetails called..");
    setCurrentSelectedOrder(order);
    handleShow();
  }

  function viewOrderDetailsModal() {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <b>Order Id : </b>
                {currentSelectedOrder.orderId}
              </Col>
              <Col>
                <b>Name :</b> {currentSelectedOrder.billingName}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Table bordered striped>
                  <tbody>
                    <tr>
                      <td>Billing Phone</td>
                      <td>{currentSelectedOrder.billingPhone}</td>
                    </tr>
                    <tr>
                      <td>Items</td>
                      <td>{currentSelectedOrder.orderItems.length}</td>
                    </tr>
                    <tr>
                      <td>Payment Status</td>
                      <td>{currentSelectedOrder.paymentStatus}</td>
                    </tr>
                    <tr>
                      <td>Order Status</td>
                      <td>{currentSelectedOrder.orderStatus}</td>
                    </tr>
                    <tr>
                      <td>Order Date</td>
                      <td>{formatDate(currentSelectedOrder.orderedDate)}</td>
                    </tr>
                    <tr>
                      <td>Billing Address</td>
                      <td>{currentSelectedOrder.billingAddress}</td>
                    </tr>

                    <tr>
                      <td>Delivered Date</td>
                      <td>
                        {currentSelectedOrder.deliveredDate
                          ? formatDate(currentSelectedOrder.deliveredDate)
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Order Amount</td>
                      <td>{currentSelectedOrder.orderAmount}</td>
                    </tr>
                  </tbody>
                </Table>
                <Card>
                  <Card.Body>
                    <h3>Order Items</h3>
                    <ListGroup>
                      {currentSelectedOrder.orderItems.map((item) => {
                        return (
                          <ListGroupItem
                            action
                            className="mt-3"
                            key={item.orderItemId}
                          >
                            <Row>
                              <Col md={2}>
                                <img
                                  src={getProductImageUrl(
                                    item.product.productId
                                  )}
                                  alt=""
                                  style={{
                                    width: "40px",
                                  }}
                                />
                              </Col>
                              <Col md={10}>
                                <h5>{item.product.title}</h5>
                                <Badge pill>Quantity {item.quantity}</Badge>
                                <Badge pill className="ms2">
                                  Amount {item.totalPrice}
                                </Badge>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const orderView = () => {
    return (
      orders && (
        <>
          <Container className="mt-3">
            <Card>
              <Card.Header>Your Orders</Card.Header>
              <Card.Body>
                {isLogin &&
                  orders.map((o) => {
                    return (
                      <SingleOrderView
                        order={o}
                        viewOrderDetails={viewOrderDetails}
                        // openEditOrderModal={openEditOrderModal}
                      ></SingleOrderView>
                    );
                  })}
              </Card.Body>
            </Card>
          </Container>
        </>
      )
    );
  };

  async function loadOrdersOfUser() {
    try {
      const orderData = await getOrdersOfUser(userData.user.userId);
      console.log(orderData);
      console.log(orders);

      setOrders(orderData);
    } catch (error) {}
  }

  return (
    <div>
      {orderView()}
      {currentSelectedOrder && viewOrderDetailsModal()}
    </div>
  );
}

export default UserOrders;
