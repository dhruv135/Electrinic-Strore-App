import React, { useContext } from "react";
import UserContext from "../../context/user.context";
import GroupElectronic from "../../assets/GroupElectronic.jpg";
import { Col, Container, Row, Button } from "react-bootstrap";
import PersonShoping from "../../assets/AnoPerShoping-removebg-preview (1).png";

function Home() {
  const userContext = useContext(UserContext);

  return (
    <Container className="p-3 border my-4">
      <Row>
        <Col>
          <img src={GroupElectronic} alt="" />
        </Col>
        <Col className="text-center">
          <h2>WELCOME {userContext?.userData?.user?.name.toUpperCase()}</h2>
          <Row className="mt-4">
            <Col>
              <img
                src={PersonShoping}
                style={{
                  height: "450px",
                }}
                alt=""
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
