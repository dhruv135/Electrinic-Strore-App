import React, { useContext } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { getProductImageUrl } from "../../Service/helper.service";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

function SingleCartItem({ cart }) {
  const { cartData, addItem, removeItem, clrCart } = useContext(CartContext);

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Row>
          <Col md={1} className="d-flex align-items-center">
            <img
              src={getProductImageUrl(cart.product.productId)}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
              }}
            />
          </Col>
          <Col md={9} className="d-flex align-items-center">
            <div>
              <h6>{cart.product.title}</h6>
              <p>
                <span className="text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempora
                </span>
              </p>
              <Row>
                <Col>
                  <p>
                    {cart.quantity} <span className="text-muted">Quantity</span>
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="text-muted">Price </span>
                    {cart.product.discountedPrice}
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="text-muted">Price </span>
                    {cart.totalPrice}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="w-100">
              <div className="d-grid">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    removeItem(cart.cartItemId);
                  }}
                >
                  remove
                </Button>
              </div>
              <div className="mt-2">
                <Row>
                  <Col className="d-grid">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        let decQuantity = cart.quantity - 1;
                        if (decQuantity > 0) {
                          addItem(cart.product.productId, decQuantity, () => {
                            toast.success("Quantiti Updated successfully");
                          });
                        } else {
                          toast.info("quantity cannot be less than one");
                        }
                      }}
                    >
                      -
                    </Button>
                  </Col>
                  <Col className="d-grid">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        let incQuantity = cart.quantity + 1;

                        addItem(cart.product.productId, incQuantity, () => {
                          toast.success("Quantiti Updated successfully");
                        });
                      }}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SingleCartItem;
