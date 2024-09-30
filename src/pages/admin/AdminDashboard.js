import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { isUserAdmin } from "../../auth/helper.auth";
import UserContext from "../../context/user.context";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";

function AdminDashboard() {
  const userContext = useContext(UserContext);

  const AdminDashBoardView = () => {
    return (
      <div>
        <Container className="p-3 fluid">
          <Row>
            <Col md={2} className="">
              <SideMenu />
            </Col>
            <Col md={10}>
              <Outlet></Outlet>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return isUserAdmin() ? AdminDashBoardView() : <h1>Your Are not Admin</h1>;
}

export default AdminDashboard;
