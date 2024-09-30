import React, { useState } from "react";
import { useEffect } from "react";
import { getAllOrders, updateOrder } from "../../Service/OrderService";
import SingleOrderView from "../../components/SingleOrderView";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

function Orders() {
  // Main state variable
  const [ordersData, setOrdersData] = useState(undefined);

  // For opening the order detail modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For opening the update order detail modal
  const [showUpdate, setShowUpdate] = useState(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = () => setShowUpdate(true);

  // For pagination
  const [currentPage, setCurrentPage] = useState(0);

  // Which order we are currently viewing or updating
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState(undefined);

  function viewOrderDetails(event, order) {
    console.log("viewOrderDetails called..");
    setCurrentSelectedOrder(order);
    handleShow();
  }

  function loadNextPage() {
    console.log("Loadin next Page");
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    getOrders(currentPage, 3, "orderedDate", "desc");
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getOrders(currentPage, 3, "orderedDate", "desc");
    }
  }, [currentPage]);

  async function getOrders(currentPage, pageSize, sortBy, sortDir) {
    const data = await getAllOrders(currentPage, pageSize, sortBy, sortDir);
    if (currentPage == 0) {
      setOrdersData(data);
    } else {
      setOrdersData({
        content: [...ordersData.content, ...data.content],
        lastPage: data.lastPage,
        pageNumber: data.pageNumber,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
      });
    }
  }

  function formatDate(time) {
    return new Date(time).toLocaleDateString();
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

  async function handleOrderUpdate(event) {
    event.preventDefault();

    if (
      currentSelectedOrder.billingName === undefined ||
      currentSelectedOrder.billingName.trim() === ""
    ) {
      toast.error("billingName should not be Blank");
      return;
    } else if (
      currentSelectedOrder.billingAddress === undefined ||
      currentSelectedOrder.billingAddress.trim() === ""
    ) {
      toast.error("billingAddress should not be Blank");
      return;
    } else if (
      currentSelectedOrder.billingPhone === undefined ||
      currentSelectedOrder.billingPhone.trim() === ""
    ) {
      toast.error("billingPhone should not be Blank");
      return;
    } else if (
      currentSelectedOrder.orderStatus === undefined ||
      currentSelectedOrder.orderStatus.trim() === ""
    ) {
      toast.error("orderStatus should not be Blank");
      return;
    } else if (
      currentSelectedOrder.paymentStatus === undefined ||
      currentSelectedOrder.paymentStatus.trim() === ""
    ) {
      toast.error("paymentStatus should not be Blank");
      return;
    }

    console.log(currentSelectedOrder);
    try {
      const data = await updateOrder(
        currentSelectedOrder,
        currentSelectedOrder.orderId
      );

      const newList = ordersData.content.map((order) => {
        if (order.orderId === currentSelectedOrder.orderId) {
          return data;
        } else {
          return order;
        }
      });
      setOrdersData({
        ...ordersData,
        content: newList,
      });
      toast.success("Order Details Updated");
    } catch (error) {
      toast.error("Not able to Update Order");
      console.log(error);
    }
  }

  function viewEditOrderModal() {
    return (
      <>
        <Button variant="primary" onClick={handleUpdateShow}>
          Launch demo modal
        </Button>

        <Modal show={showUpdate} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Modal Here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleOrderUpdate}>
              <Form.Group>
                <Form.Label>Billing Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSelectedOrder.billingName}
                  onChange={(event) => {
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      billingName: event.target.value,
                    });
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSelectedOrder.billingAddress}
                  onChange={(event) => {
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      billingAddress: event.target.value,
                    });
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Billing Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSelectedOrder.billingPhone}
                  onChange={(event) => {
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      billingPhone: event.target.value,
                    });
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Order Status</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      orderStatus: event.target.value,
                    });
                  }}
                >
                  <option
                    selected={currentSelectedOrder.orderStatus === "PENDING"}
                    value="PENDING"
                  >
                    PENDING
                  </option>
                  <option
                    selected={currentSelectedOrder.orderStatus === "DISPATCHED"}
                    value="DISPATCHED"
                  >
                    DISPATCHED
                  </option>
                  <option
                    selected={currentSelectedOrder.orderStatus === "ONWAY"}
                    value="ONWAY"
                  >
                    ONWAY
                  </option>
                  <option
                    selected={currentSelectedOrder.orderStatus === "DELIVERED"}
                    value="DELIVERED"
                  >
                    DELIVERED
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    console.log(event.target.value);
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      paymentStatus: event.target.value,
                    });
                  }}
                >
                  <option
                    selected={currentSelectedOrder.paymentStatus === "PAID"}
                    value="PAID"
                  >
                    PAID
                  </option>
                  <option
                    selected={currentSelectedOrder.paymentStatus === "NOT PAID"}
                    value="NOT PAID"
                  >
                    NOT PAID
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Delivered Date</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSelectedOrder.deliveredDate}
                  onChange={(event) => {
                    setCurrentSelectedOrder({
                      ...currentSelectedOrder,
                      deliveredDate: event.target.value,
                    });
                  }}
                ></Form.Control>
                <p className="text-muted">YYYY-MM-dd</p>
              </Form.Group>
              <Container className="text-center">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function openEditOrderModal(event, order) {
    handleUpdateShow(true);
    setCurrentSelectedOrder({ ...order });
  }

  const orderView = () => {
    return (
      ordersData && (
        <>
          <Card>
            <Card.Header>All Orders</Card.Header>
            <Card.Body>
              <InfiniteScroll
                dataLength={ordersData.content.length}
                next={loadNextPage}
                hasMore={!ordersData.lastPage}
                loader={<h3 className="text-center my4">Loading...</h3>}
                endMessage={<p className="text-center">All Orders Loaded</p>}
              >
                {ordersData?.content?.map((o) => {
                  return (
                    <SingleOrderView
                      order={o}
                      viewOrderDetails={viewOrderDetails}
                      openEditOrderModal={openEditOrderModal}
                    ></SingleOrderView>
                  );
                })}
              </InfiniteScroll>
            </Card.Body>
          </Card>
        </>
      )
    );
  };

  return (
    <div>
      <Row>
        <Col>
          {orderView()}
          {currentSelectedOrder && viewOrderDetailsModal()}
          {currentSelectedOrder && viewEditOrderModal()}
        </Col>
      </Row>
    </div>
  );
}

export default Orders;
