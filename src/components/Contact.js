import React from "react";
import Base from "./Base";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";

function Contact() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3 className="text-center">Contact Us</h3>
              <Form>
                <FormGroup>
                  <Form.Label>Your Name:</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="number"></Form.Control>
                </FormGroup>
                <FormGroup>
                  <Form.Label>Message For us</Form.Label>
                  <Form.Control as={"textarea"} rows={8}></Form.Control>
                </FormGroup>
                <Container className="d-grid mt-3">
                  <Button>Submit</Button>
                </Container>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
