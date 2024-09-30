import axios from "axios";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Base({
  title = "Page Title",
  description = "Welcome to dynamic store ,Here You will find all your product",
  buttonEnabled,
  buttonType,
  buttonText,
  buttonLink = "/",
  children,
}) {
  const styleBase = {
    height: "200px",
  };

  return (
    <div>
      <Container
        style={styleBase}
        fluid
        className="bg-dark text-white p-5 text-center d-flex justify-content-center align-items-center"
      >
        <div>
          <h3 className="text-center">{title}</h3>
          <p className="text-center">{description && description}</p>
          {buttonEnabled && (
            <Button as={NavLink} to={buttonLink} variant={buttonType}>
              {buttonText}
            </Button>
          )}
        </div>
      </Container>

      {children}
    </div>
  );
}

export default Base;
