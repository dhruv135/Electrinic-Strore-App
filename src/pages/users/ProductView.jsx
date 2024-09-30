import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../Service/product.service";
import { toast } from "react-toastify";
import { Card, Col, Container, Row, Badge, Button } from "react-bootstrap";
import ShowHtml from "../../components/ShowHtml";
import { getProductImageUrl } from "../../Service/helper.service";
import CartContext from "../../context/CartContext";

function ProductView() {
  const { productId } = useParams();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    loadSingleProduct(productId);
  }, []);

  const [productView, setProductView] = useState(null);

  function loadSingleProduct(productId) {
    getSingleProduct(productId)
      .then((data) => {
        console.log(data);
        setProductView(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading the product");
      });
  }

  function handleAddItem(productId, quantity) {
    addItem(productId, quantity, () => {
      toast.success("Item added successfully");
    });
  }

  function viewProduct() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card className="mt-4">
                <Card.Body>
                  <Container className="my-4">
                    <Row>
                      <Col>
                        <img
                          src={getProductImageUrl(productView.productId)}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                          }}
                          alt=""
                        />
                      </Col>
                      <Col>
                        <h3 className="mt-2">{productView.title}</h3>
                        <Badge bg={productView.stock ? "info" : "danger"}>
                          {productView.stock ? "In stock" : "Out Of Stock"}
                        </Badge>
                        <Badge className="ms-2">
                          {productView.live ? "Live" : "Comming Soon..."}
                        </Badge>
                        <p className="text-muted">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Totam, laboriosam!
                        </p>
                        <b>
                          <s className="text-muted h4">₹ {productView.price}</s>
                        </b>
                        <b className="h3">₹ {productView.discountedPrice}</b>
                        <Container className="d-grid mt-2 gap-2">
                          <Button
                            variant="warning"
                            onClick={() => {
                              handleAddItem(productView.productId, 1);
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Button variant="info">Buy Now</Button>
                        </Container>
                      </Col>
                    </Row>
                  </Container>

                  <div>
                    <ShowHtml htmlText={productView.description}></ShowHtml>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return productView && viewProduct();
}

export default ProductView;
