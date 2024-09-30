import React from "react";
import { Container, Spinner } from "react-bootstrap";

function Loading({ show }) {
  return (
    show && (
      <div>
        <Container className="text-center p-4">
          <Spinner size="lg"></Spinner>
        </Container>
      </div>
    )
  );
}

export default Loading;
