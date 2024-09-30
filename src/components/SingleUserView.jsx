import React from "react";
import { Badge, Card, CardBody, Col, ListGroup, Row } from "react-bootstrap";
import { getUserImageUrl } from "../Service/helper.service";
import defaultProfileImage from "../assets/Profile.jpg";
import { Link } from "react-router-dom";

function SingleUserView({ user }) {
  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col md={3}>
              <img
                src={
                  user.imageName
                    ? getUserImageUrl(user.userId)
                    : defaultProfileImage
                }
                alt=""
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
                onError={(event) => {
                  event.target.setAttribute("src", defaultProfileImage);
                }}
              />
            </Col>
            <Col md={9}>
              <Link to={`/users/profile/${user.userId}`}>
                <h5>{user.name}</h5>
              </Link>
              <p>{user.about}</p>
              {user.roles?.map((role) => {
                return (
                  <Badge
                    className={
                      role.roleName === "ROLE_ADMIN"
                        ? "mx-3 bg-info"
                        : "mx-3 bg-success"
                    }
                  >
                    {role.roleName}
                  </Badge>
                );
              })}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SingleUserView;
