import React, { useState, useEffect } from "react";
import CategoryView from "../../components/CategoryView";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../Service/Category.Service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Container,
  Spinner,
  Modal,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

function ViewCategories() {
  const [categories, setCategories] = useState({
    content: [],
  });
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateShow, setupdateShow] = useState(false);
  const updateHandleClose = () => setupdateShow(false);
  const updateHandleShow = () => setupdateShow(true);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured while fetching the categories");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getCategories(currentPage)
        .then((data) => {
          console.log(data);
          setCategories({
            content: [...categories.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error occured while fetching the categories");
        });
    }
  }, [currentPage]);

  function deleteCategoryMain(categorieId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(categorieId)
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setCategories({
              ...categories,
              content: categories.content.filter((c) => {
                return c.categoryId !== categorieId;
              }),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  function loadNextPage() {
    setCurrentPage(currentPage + 1);
  }

  // HANDLE VIEW BUTTON OF CATEGORY

  const handleView = (categorie) => {
    setSelectedCategory(categorie);
    handleShow();
  };

  // HANDLE UPDATE BUTTON OF CATEGORY

  const handleUpdateView = (categorie) => {
    setSelectedCategory(categorie);
    updateHandleShow();
  };

  const updateCategoryHandleSubmit = (event) => {
    event.preventDefault();

    if (
      selectedCategory.description === undefined ||
      selectedCategory.description.trim() === ""
    ) {
      toast.error("Please Enter the description");
      return;
    } else if (
      selectedCategory.title === undefined ||
      selectedCategory.title.trim() === ""
    ) {
      toast.error("Please Enter the Title");
      return;
    }
    updateCategory(selectedCategory)
      .then((data) => {
        console.log(data);
        const newArray = categories.content.map((cat) => {
          if (cat.categoryId === data.categoryId) {
            cat.title = data.title;
            cat.description = data.description;
            cat.coverImage = data.coverImage;
          }
          return cat;
        });
        setCategories({
          ...categories,
          content: newArray,
        });
        updateHandleClose();
        toast.success("category updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Some Error occured while updating");
      });
  };

  function viewModal() {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <img
                src={selectedCategory.coverImage}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                }}
              />
            </Container>
            <div className="mt-3">{selectedCategory.description}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function updateModal() {
    return (
      <>
        <Modal show={updateShow} onHide={updateHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedCategory.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCategory.title}
                  onChange={(event) => {
                    setSelectedCategory({
                      ...selectedCategory,
                      title: event.target.value,
                    });
                  }}
                ></Form.Control>
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  value={selectedCategory.description}
                  rows={4}
                  onChange={(event) => {
                    setSelectedCategory({
                      ...selectedCategory,
                      description: event.target.value,
                    });
                  }}
                ></Form.Control>
              </FormGroup>

              <Container className="mt-3">
                <img
                  src={selectedCategory.coverImage}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                  }}
                />
              </Container>
              <FormGroup className="mt-3">
                <Form.Label>Image URl</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedCategory.coverImage}
                  onChange={(event) => {
                    setSelectedCategory({
                      ...selectedCategory,
                      coverImage: event.target.value,
                    });
                  }}
                ></Form.Control>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={updateHandleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(event) => {
                updateCategoryHandleSubmit(event);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <Container className="text-center">
          <Spinner></Spinner>
        </Container>
      ) : (
        ""
      )}
      <InfiniteScroll
        dataLength={categories.content.length}
        next={loadNextPage}
        hasMore={!categories.lastPage}
        loader={<h4>Loading.....</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {categories.content.map((categorie) => {
          return (
            <CategoryView
              deleteCat={deleteCategoryMain}
              updateCat={handleUpdateView}
              viewCat={handleView}
              key={categorie.categorieId}
              categorie={categorie}
            />
          );
        })}
      </InfiniteScroll>
      {selectedCategory ? viewModal() : ""}
      {selectedCategory ? updateModal() : ""}
    </div>
  );
}

export default ViewCategories;
