import React from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleOrderView({ order, viewOrderDetails, openEditOrderModal }) {
  function formatDate(time) {
    return new Date(time).toLocaleDateString();
  }

  return (
    <div className="mb-4">
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <b>Order Id : </b>
              {order.orderId}
            </Col>
            <Col>
              <b>Ordered By :</b>
              <Link to={`/users/profile/${order.user.userId}`}>
                {" "}
                {order.user.name}
              </Link>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Table bordered striped>
                <tbody>
                  <tr>
                    <td>Billing Name</td>
                    <td>{order.billingName}</td>
                  </tr>
                  <tr>
                    <td>Items</td>
                    <td>{order.orderItems.length}</td>
                  </tr>
                  <tr>
                    <td>Payment Status</td>
                    <td>{order.paymentStatus}</td>
                  </tr>
                  <tr>
                    <td>Order Status</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                  <tr>
                    <td>Order Date</td>
                    <td>{formatDate(order.orderedDate)}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
        <Container className="text-center mb-3">
          <Button
            variant="info"
            onClick={(event) => {
              viewOrderDetails(event, order);
            }}
          >
            View Orders Details
          </Button>

          {openEditOrderModal && (
            <Button
              onClick={(event) => {
                openEditOrderModal(event, order);
              }}
              variant="danger ms-2"
            >
              Update
            </Button>
          )}

          {!openEditOrderModal && order.paymentStatus === "NOT PAID" && (
            <Button onClick={(event) => {}} variant="success" className="ms-2">
              Proceed to payment
            </Button>
          )}
        </Container>
      </Card>
    </div>
  );
}

export default SingleOrderView;
