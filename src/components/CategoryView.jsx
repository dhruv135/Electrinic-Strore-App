import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import defaultImg from "../assets/Profile.jpg";

function CategoryView({ categorie, deleteCat, updateCat, viewCat }) {
  const imgStyle = {
    width: "150px",
    height: "150px",
  };

  function deleteCategory(categorieId) {
    deleteCat(categorieId);
  }

  return (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col md={3}>
              <img
                src={categorie.coverImage ? categorie.coverImage : defaultImg}
                alt=""
                style={imgStyle}
              />
            </Col>
            <Col md={6}>
              <h5>{categorie.title}</h5>
              <p>{categorie.description}</p>
            </Col>
            <Col md={3}>
              <Container className="d-grid gap-2">
                <Button
                  onClick={() => {
                    viewCat(categorie);
                  }}
                >
                  View
                </Button>
                <Button
                  variant="info"
                  onClick={() => {
                    updateCat(categorie);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteCategory(categorie.categoryId);
                  }}
                >
                  Delete
                </Button>
              </Container>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CategoryView;
