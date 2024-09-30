import React, { useContext, useEffect, useState } from "react";
import UserProfileView from "../../components/user/UserProfileView";
import { Col, Row, Modal, Button, Spinner, InputGroup } from "react-bootstrap";
import {
  getUser,
  updateUser,
  updateUserProfileImage,
} from "../../Service/user.service";
import { toast } from "react-toastify";
import { Card, Container, Table, Form } from "react-bootstrap";
import defaultProfile from "../../assets/Profile.jpg";

import { BASE_URL } from "../../Service/helper.service";
import UserContext from "../../context/user.context";

function Profile() {
  console.log("Profile called....");
  const userContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [image, setImage] = useState({
    placeholder: defaultProfile,
    file: null,
  });

  const imageStyle = {
    maxWidth: "250px",
    maxheight: "250px",
    border: "50%",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function updateFieldHandler(event, property) {
    console.log("updateFieldHandler called");
    setUser({ ...user, [property]: event.target.value });
  }

  function clearImage() {
    setImage({
      placeholder: defaultProfile,
      file: null,
    });
  }

  function updateUserData() {
    setUpdateLoading(true);
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        updateUserProfileImage(image.file, user.userId)
          .then((data) => {
            toast.success(data.message);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Image Not Uploaded");
          })
          .finally(() => {
            setUpdateLoading(false);
          });
        toast.success("User Updated successfully");
      })

      .catch((error) => {
        console.log(error);
        toast.error("Not able to update the user");
        setUpdateLoading(false);
      });
  }

  function handleProfileImageChange(event) {
    const reader = new FileReader();
    reader.onload = (r) => {
      setImage({
        placeholder: r.target.result,
        file: event.target.files[0],
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  useEffect(() => {
    if (userContext.userData) {
      getUserDataFromServer();
    }
  }, [userContext.userData]);

  const getUserDataFromServer = () => {
    const userId = userContext.userData.user.userId;
    getUser(userId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch(() => {
        toast.error("Some Error occured While fetching data from the server");
      });
  };

  const UpdateViewModal = () => {
    console.log(updateLoading);
    console.log("UpdateViewModal called...");
    return (
      <>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Card className="m-3">
              <Card.Body>
                <Container className="text-center my-3"></Container>
                <h3 className="text-center fw-bold text-primary">
                  {user?.name}
                </h3>
                <div className="mt-3">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Profile Image</td>
                        <td>
                          <Container className="text-center mb-3">
                            <img
                              src={image.placeholder}
                              alt=""
                              height={180}
                              width={180}
                            />
                          </Container>
                          <InputGroup>
                            <Form.Control
                              type="file"
                              onChange={(event) => {
                                handleProfileImageChange(event);
                              }}
                            ></Form.Control>
                            <Button onClick={clearImage}>Clear</Button>
                          </InputGroup>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={user?.name}
                            onChange={(event) => {
                              updateFieldHandler(event, "name");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          <Form.Control type="text" value={user?.email} />
                        </td>
                      </tr>
                      <tr>
                        <td>New Password</td>
                        <td>
                          <Form.Control
                            type="Password"
                            placeholder="enter new password"
                            onChange={(event) => {
                              updateFieldHandler(event, "password");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>
                          <Form.Control type="text" value={user?.gender} />
                        </td>
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={user?.about}
                            onChange={(event) => {
                              updateFieldHandler(event, "abput");
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Roles</td>
                        <td>
                          {user?.roles.map((role) => role.roleName + " ")}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserData}>
              <Spinner
                animation="border"
                size="sm"
                hidden={!updateLoading}
              ></Spinner>
              <span hidden={!updateLoading}>Updating...</span>
              <span hidden={updateLoading}>Save Changes</span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col
            md={{
              span: 8,
              offset: 2,
            }}
          >
            {user ? (
              <>
                <UserProfileView
                  user={user}
                  handleShow={handleShow}
                ></UserProfileView>
                {UpdateViewModal()}
              </>
            ) : (
              <h1>Loading......</h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
