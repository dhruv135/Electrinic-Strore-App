import React from "react";
import Base from "./Base";
import { Col, Container, Row } from "react-bootstrap";

function About() {
  return (
    <Container
      style={{
        display: "grid",
        placeItems: "center",
        height: "80vh",
      }}
    >
      <div>
        <Row>
          <Col>
            <Container>
              <img
                src={
                  "https://media.istockphoto.com/id/1347626309/photo/latina-female-using-desktop-computer-with-clothing-online-web-store-to-choose-and-buy-clothes.jpg?s=612x612&w=0&k=20&c=SGKPpmCvxMFYld_4MXuSUBFmAcHylKNp2kJgWuszmgw="
                }
                alt=""
              />
            </Container>
          </Col>
          <Col className="d-grid gap-3">
            <h2>What We Do ?</h2>
            <h5>
              So, what exactly is text message commerce? It is a way of
              communicating with customers via text messaging that allows
              businesses to connect on a personal level, offering customer
              service
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae
              provident consequatur quam omnis et nam rem unde odit rerum quas
              quo incidunt, atque quibusdam ut quis illo, quod architecto.
              Alias? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Vitae provident consequatur quam omnis et nam rem unde odit rerum
              quas quo incidunt, atque quibusdam ut quis illo, quod architecto.
              Alias? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Vitae provident consequatur quam omnis et nam rem unde odit rerum
              quas quo incidunt, atque quibusdam ut quis illo, quod architecto.
              Alias?
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default About;
