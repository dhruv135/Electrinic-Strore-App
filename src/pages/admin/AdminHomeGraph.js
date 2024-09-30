import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineLaptopChromebook } from "react-icons/md";

function AdminHomeGraph() {
  return (
    <div>
      <Container>
        <Row>
          <Col
            style={{
              padding: "12px",
            }}
          >
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center">Welcome to Admin DashBoard</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae ad aliquid inventore amet aut quam voluptates sunt
                  facilis illo a, necessitatibus ipsam vero libero ipsa at
                  repellat veritatis labore exercitationem.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col
            style={{
              padding: "12px",
            }}
            className="shadow-sm"
          >
            <FaUser
              style={{
                width: "80px",
                height: "80px",
              }}
            />
            <h3>No of Users</h3>
            <h5>45 +</h5>
          </Col>
          <Col
            style={{
              padding: "12px",
            }}
            className="shadow-sm"
          >
            <MdOutlineProductionQuantityLimits
              style={{
                width: "80px",
                height: "80px",
              }}
            />
            <h3>No of Products</h3>
            <h5>45 +</h5>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col
            style={{
              padding: "12px",
            }}
            className="shadow-sm"
          >
            <BiCategoryAlt
              style={{
                width: "80px",
                height: "80px",
              }}
            />
            <h3>No of Categories</h3>
            <h5>45 +</h5>
          </Col>
          <Col
            style={{
              padding: "12px",
            }}
            className="shadow-sm"
          >
            <MdOutlineLaptopChromebook
              style={{
                width: "80px",
                height: "80px",
              }}
            />
            <h3>Total Revenue</h3>
            <h5>450000+</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminHomeGraph;
