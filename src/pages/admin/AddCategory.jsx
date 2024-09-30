import React, { useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import { addCategory } from "../../Service/Category.Service";
import { toast } from "react-toastify";

function AddCategory() {
  const [categorie, setCategorie] = useState({
    coverImage: "",
    description: "",
    title: "",
  });

  function handleFieldChange(event, property) {
    setCategorie({
      ...categorie,
      [property]: event.target.value,
    });
  }

  function clearFieldInputs() {
    setCategorie({
      coverImage: "",
      description: "",
      title: "",
    });
  }

  function handleAddCategory(event) {
    event.preventDefault();

    if (
      categorie.description === undefined ||
      categorie.description.trim() === ""
    ) {
      toast.error("Please Enter the description");
      return;
    } else if (categorie.title === undefined || categorie.title.trim() === "") {
      toast.error("Please Enter the Title");
      return;
    }
    addCategory(categorie)
      .then((data) => {
        console.log(data);
        toast.success("Category Added successfuly");
        clearFieldInputs();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured while adding category");
        clearFieldInputs();
      });
  }

  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <h5>Add Category</h5>
            <Form onSubmit={handleAddCategory}>
              <FormGroup>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the title"
                  value={categorie.title}
                  onChange={(event) => {
                    handleFieldChange(event, "title");
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  rows={6}
                  as={"textarea"}
                  placeholder="Enter the description"
                  value={categorie.description}
                  onChange={(event) => {
                    handleFieldChange(event, "description");
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Category Cover Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the URL"
                  value={categorie.coverImage}
                  onChange={(event) => {
                    handleFieldChange(event, "coverImage");
                  }}
                />
              </FormGroup>
              <Container className="text-center mt-2">
                <Button type="submit" variant="primary" size="sm">
                  Add Category
                </Button>
                <Button
                  className="ms-2"
                  variant="danger"
                  size="sm"
                  onClick={clearFieldInputs}
                >
                  clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddCategory;
