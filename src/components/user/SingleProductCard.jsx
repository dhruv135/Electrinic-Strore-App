import React, { useContext } from "react";
import { Card, Container, Button, Badge } from "react-bootstrap";
import { getProductImageUrl } from "../../Service/helper.service";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { toast } from "react-toastify";

function SingleProductCard({ product }) {
  const { addItem } = useContext(CartContext);

  function handleAddItem(productId, quantity) {
    addItem(productId, quantity, () => {
      toast.success("Item added successfully");
    });
  }

  return (
    <div>
      <Card className="m-1 shadow-sm">
        <Card.Body>
          <Container className="text-center">
            <img
              src={getProductImageUrl(product.productId)}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />
          </Container>
          <h5 className="mt-2">{product.title}</h5>
          <Badge bg={product.stock ? "info" : "danger"}>
            {product.stock ? "In stock" : "Out Of Stock"}
          </Badge>
          <Badge className="ms-2">
            {product.live ? "Live" : "Comming Soon..."}
          </Badge>
          <p className="text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam,
            laboriosam!
          </p>
          <b>
            <s className="text-muted h4">₹ {product.price}</s>
          </b>
          <b className="h3">₹ {product.discountedPrice}</b>
          <Container className="d-grid gap-2 mt-2">
            <Button
              as={Link}
              to={`/store/productView/${product.productId}`}
              variant="success"
            >
              View Product
            </Button>
            <Button
              variant="info"
              onClick={() => {
                handleAddItem(product.productId, 1);
              }}
            >
              Add to cart
            </Button>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleProductCard;
