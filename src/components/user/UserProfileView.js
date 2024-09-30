import React, { useContext } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import Profile from "../../assets/Profile.jpg";
import { BASE_URL } from "../../Service/helper.service";
import UserContext from "../../context/user.context";

function UserProfileView({ user = null, handleShow }) {
  const imageStyle = {
    maxWidth: "225px",
    maxheight: "225px",
    border: "50%",
  };

  const { userData, isLogin } = useContext(UserContext);

  return (
    <div>
      {user && (
        <Card className="m-3">
          <Card.Body>
            <Container className="text-center my-3">
              <img
                style={imageStyle}
                src={
                  user.imageName
                    ? BASE_URL +
                      "/users/image/" +
                      user.userId +
                      "?" +
                      new Date().getTime()
                    : Profile
                }
                alt="Profile Image"
                onError={(event) => {
                  event.target.setAttribute("src", Profile);
                }}
              />
            </Container>
            <h3 className="text-center fw-bold text-primary">
              {user?.name.toUpperCase()}
            </h3>
            <div className="mt-3">
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{user?.gender}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>{user?.about}</td>
                  </tr>
                  <tr>
                    <td>Roles</td>
                    <td>{user?.roles.map((role) => role.roleName + " ")}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {isLogin && userData.user.userId === user.userId ? (
              <Container className="text-center">
                <Button variant="primary" onClick={handleShow}>
                  Update
                </Button>
                <Button className="ms-2" variant="warning">
                  Orders
                </Button>
              </Container>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default UserProfileView;
