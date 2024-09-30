import { Card, Col, Container, Row, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../Service/helper.service";
import SingleProductCard from "../components/user/SingleProductCard";
import HomeImage from "../assets/HomeImage.jpg";

export const trendingProducts = (products) => {
  return (
    <Container>
      <Row>
        <h3 className="my-4 text-center">Trending Products</h3>
        {products.map((product) => {
          return (
            <Col md={4}>
              <SingleProductCard product={product}></SingleProductCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export const infoWithImageSection = (image, text, title) => {
  return (
    <Container className="text-center border p-5">
      <Row>
        <Col>
          <h3>{title.toUpperCase()}</h3>
          <p>{text}</p>
          <Container className="d-grid">
            <Button variant="info" as={Link} to={"/store"}>
              Store
            </Button>
          </Container>
        </Col>
        <Col>
          <img
            src={HomeImage}
            alt=""
            style={{
              width: "100%",
              height: "255px",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
