import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function PracticeFooter() {
  return (
    <Container className="border-top p-3 " fluid>
      <Row>
        <Col md="4">
          <h4>Company name</h4>
          <p>
            Hello users welcome to ecommerce store here you can shop with
            amazing discount on each products with different category here we
            provide amazing service in case you want to contact us please go to
            the contact us section Hello users welcome to ecommerce store here
            you can shop with amazing discount on each products with different
            category here we provide amazing service in case you want to contact
            us please go to the contact us section
          </p>
        </Col>
        <Col>
          <h4>Products</h4>
          <p>
            <a href="#!" className="text-reset">
              Iphone
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              AC
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              Samsung Products
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              One Plus Mobile
            </a>
          </p>
        </Col>
        <Col>
          <h4>Useful Links</h4>
          <p>
            <NavLink to={"/about"}>about</NavLink>
          </p>
          <p>
            <NavLink to={"/contact"}>contact us</NavLink>
          </p>
          <p>
            <NavLink to={"/store"}>store</NavLink>
          </p>
          <p>
            <NavLink to={"/cart"}>cart</NavLink>
          </p>
        </Col>
        <Col>
          <h4>Adderss</h4>
          <p>New York, NY 10012, US</p>
          <p>info@example.com</p>
          <p>+ 01 234 567 88</p>
          <p>+ 01 234 567 89</p>
        </Col>
      </Row>
    </Container>
  );
}

export default PracticeFooter;
