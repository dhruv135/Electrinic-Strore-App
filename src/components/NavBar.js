import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user.context";
import CartContext from "../context/CartContext";

function NavBar() {
  const userContext = useContext(UserContext);
  const { cartData } = useContext(CartContext);

  function handleLogout() {
    userContext.logout();
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Electro Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {/* <Nav.Link as={NavLink} to="/services">
              Services
            </Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown
              title="Product Categories"
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                Branded Phones
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Smart Tv</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Tabletes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Washing Machine
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/store">
              Store
            </Nav.Link>
            {userContext.isLogin && (
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/cart">
              cart {userContext.isLogin && cartData && cartData.items.length}
            </Nav.Link>
          </Nav>

          <Nav>
            {userContext.isLogin ? (
              <>
                {userContext.isAdminUser && (
                  <Nav.Link as={NavLink} to="/admin/adminHome">
                    Go To Admin DashBoard
                  </Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/users/profile">
                  Welcome {userContext.userData.user.name}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
