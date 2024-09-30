import React, { useEffect, useState, useRef } from "react";
import { getCategories } from "../../Service/Category.Service";

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProductImage,
  createProductInCategory,
  createProductWithOutCategory,
} from "../../Service/product.service";

import { Editor } from "@tinymce/tinymce-react";

function AddProducts() {
  const [product, setProduct] = useState({
    description: "",
    discountedPrice: 0,
    live: false,
    price: 0,
    image: undefined,
    imagePreview: undefined,
    quantity: 1,
    stock: true,
    title: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("None");

  const [categories, setCategories] = useState(undefined);

  let editorRef = useRef();

  useEffect(() => {
    getCategories(0, 1000)
      .then((data) => {
        console.log(data);
        setCategories(data);
        //toast.success("Categories fetched successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in fetching the categories");
      });
  }, []);

  function clearForm() {
    console.log("clear form called");

    editorRef.current.setContent("");
    setProduct({
      description: "",
      discountedPrice: 0,
      live: false,
      price: 0,
      image: undefined,
      imagePreview: undefined,
      quantity: 1,
      stock: true,
      title: "",
    });
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (r) => {
      setProduct({
        ...product,
        imagePreview: r.target.result,
        image: event.target.files[0],
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  function addProductButton(event) {
    event.preventDefault();
    if (product.title === undefined || product.title.trim() === "") {
      toast.error("Title is required");
      return;
    }
    if (
      product.description === undefined ||
      product.description.trim() === ""
    ) {
      toast.error("description is required");
      return;
    }

    if (product.quantity <= 0) {
      toast.error("Quantity should be greater than 1");
      return;
    }

    if (selectedCategory === "None") {
      console.log("addProductButton None called");
      createProductWithOutCategory(product)
        .then((data) => {
          // now adding the product Image
          toast.success("Producted created successfully");
          clearForm();
          if (product.image) {
            addProductImage(product.image, data.productId)
              .then((data) => {
                console.log(data);
                toast.success("Image Added succesfully");
                clearForm();
              })
              .catch((error) => {
                console.log(error);
                toast.error("Error occured while uploading the image");
              });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating Product");
        });
    } else {
      console.log("addProductButton some cat called");
      createProductInCategory(product, selectedCategory)
        .then((data) => {
          // now adding the product Image
          toast.success("Producted created successfully");
          clearForm();
          if (product.image) {
            addProductImage(product.image, data.productId)
              .then((data) => {
                console.log(data);

                toast.success("Image Added succesfully");
                clearForm();
              })
              .catch((error) => {
                console.log(error);
                toast.error("Error occured while uploading the image");
              });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in creating Product");
        });
    }
  }

  const formView = () => {
    return (
      <div>
        <Card>
          {/* {JSON.stringify(product)} */}
          <Card.Body>
            <h4 className="text-center">ADD PRODUCT</h4>
            <Form
              onSubmit={(event) => {
                addProductButton(event);
              }}
            >
              <FormGroup className="mt-2">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter product title"
                  onChange={(event) => {
                    setProduct({ ...product, title: event.target.value });
                  }}
                  value={product.title}
                ></Form.Control>
              </FormGroup>
              <FormGroup className="mt-2">
                <Form.Label>Product Description</Form.Label>
                {/* <Form.Control
                  as={"textarea"}
                  placeholder="enter product title"
                  rows={6}
                  onChange={(event) => {
                    setProduct({ ...product, description: event.target.value });
                  }}
                  value={product.description}
                ></Form.Control> */}
                <Editor
                  apiKey="u50i662x7ejicc0bdjcs7o3qlq2kro5rkpum2qnb8fq9bdjv"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={() => {
                    setProduct({
                      ...product,
                      description: editorRef.current.getContent(),
                    });
                  }}
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup className="mt-2">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="enter product price"
                      onChange={(event) => {
                        setProduct({ ...product, price: event.target.value });
                      }}
                      value={product.price}
                    ></Form.Control>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mt-2">
                    <Form.Label>Product Discounted Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="enter product discounted price"
                      onChange={(event) => {
                        console.log(event.target.value);
                        console.log(product.price);
                        if (
                          parseInt(event.target.value) > parseInt(product.price)
                        ) {
                          console.log(product.price + " Inside if");
                          console.log(event.target.value + " Inside if");
                          toast.error(
                            "discounted price cannot be greater than actual price"
                          );
                          return;
                        }
                        setProduct({
                          ...product,
                          discountedPrice: event.target.value,
                        });
                      }}
                      value={product.discountedPrice}
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup className="mt-2">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter product quantity"
                  onChange={(event) => {
                    setProduct({ ...product, quantity: event.target.value });
                  }}
                  value={product.quantity}
                ></Form.Control>
              </FormGroup>
              <Row>
                <Col>
                  <Form.Check
                    className="mt-3"
                    type="switch"
                    label="live"
                    checked={product.live}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        live: !product.live,
                      });
                    }}
                  />
                </Col>
                <Col>
                  <Form.Check
                    className="mt-3"
                    type="switch"
                    label="stock"
                    checked={product.stock}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        stock: !product.stock,
                      });
                    }}
                  />
                </Col>
              </Row>
              <FormGroup className="mt-2">
                {product.imagePreview ? (
                  <Container className="text-center">
                    <p>Image Preview</p>
                    <img
                      src={product.imagePreview}
                      alt=""
                      className="img-fluid"
                      style={{
                        maxHeight: "250px",
                      }}
                    />
                  </Container>
                ) : (
                  ""
                )}
                <Form.Label>Select Product Image</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="file"
                    onChange={(event) => {
                      handleFileChange(event);
                    }}
                  ></Form.Control>
                  <Button
                    onClick={() => {
                      setProduct({
                        ...product,
                        image: undefined,
                        imagePreview: undefined,
                      });
                    }}
                  >
                    clear
                  </Button>
                </InputGroup>
              </FormGroup>
              {/* {JSON.stringify(selectedCategory)} */}
              <FormGroup>
                <Form.Label>Categories</Form.Label>
                <Form.Select
                  onChange={(event) => {
                    setSelectedCategory(event.target.value);
                  }}
                >
                  <option value="None">None</option>
                  {categories ? (
                    categories.content.map((cat) => {
                      return (
                        <option value={cat.categoryId} key={cat.categoryId}>
                          {cat.title}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">No Categories Available</option>
                  )}
                </Form.Select>
              </FormGroup>

              <Container className="text-center mt-2">
                <Button variant="danger" onClick={clearForm}>
                  Reset
                </Button>
                <Button type="submit" className="ms-2">
                  Add
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return <div>{formView()}</div>;
}

export default AddProducts;
