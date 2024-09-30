import React, { useEffect, useState, useRef } from "react";
import {
  addProductImage,
  getAllproducts,
  searchProduct,
  updateProductCategory,
  updateProductService,
} from "../../Service/product.service";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Pagination,
  Row,
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import { getProductImageUrl } from "../../Service/helper.service";
import ShowHtml from "../../components/ShowHtml";
import { Editor } from "@tinymce/tinymce-react";
import { getCategories } from "../../Service/Category.Service";

function ViewProducts() {
  const [products, setProducts] = useState(undefined);
  const [preservedProducts, setPreservedProduct] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [imageUpdate, setImageUpdate] = useState({
    image: undefined,
    imagePreview: undefined,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("none");
  const [searchQuery, setSearchQuery] = useState(undefined);

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
  let editorRef = useRef();
  // START OF OPEN PRODUCT VIEW MODAL STATE VARIABLES

  const [show, setShow] = useState(false);
  const [currentSelectedProduct, setCurrentSelectedProduct] =
    useState(undefined);

  const handleProductCloseModal = () => setShow(false);
  const handleProductShowModal = (product) => {
    console.log(product);
    setCurrentSelectedProduct(product);
    setShow(true);
  };

  //END OF PRODUCT VIEW STATE VAIABLES

  // START OF EDIT PRODUCT STATE VARIABLES

  const [showEdit, setShowEdit] = useState(false);
  const closeEditProductModel = (product) => {
    setShowEdit(false);
  };

  const openEditProductModel = (product) => {
    console.log(product);
    setCurrentSelectedProduct(product);
    console.log(currentSelectedProduct);
    setShowEdit(true);
  };

  // END OF EDIT PRODUCT STATE VARIABLES

  useEffect(() => {
    getProducts();
  }, []);

  const handleFileChange = (event) => {
    console.log(imageUpdate);
    console.log("hello");
    const reader = new FileReader();
    reader.onload = (r) => {
      setImageUpdate({
        imagePreview: r.target.result,
        image: event.target.files[0],
      });
      console.log(imageUpdate);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  function updateProduct(event) {
    event.preventDefault();
    if (
      currentSelectedProduct.title === undefined ||
      currentSelectedProduct.title.trim() === ""
    ) {
      toast.error("title should be blank", {
        position: "top-right",
      });
      return;
    }
    if (
      currentSelectedProduct.description === undefined ||
      currentSelectedProduct.description.trim() === ""
    ) {
      toast.error("description should be blank", {
        position: "top-right",
      });
      return;
    }

    if (
      currentSelectedProduct.price <= 0 ||
      currentSelectedProduct.price === undefined ||
      currentSelectedProduct.price.trim()
    ) {
      toast.error("price should be greater than 0", {
        position: "top-right",
      });
      return;
    }
    if (
      currentSelectedProduct.discountedPrice <= 0 ||
      currentSelectedProduct.discountedPrice === undefined ||
      currentSelectedProduct.discountedPrice.trim()
    ) {
      toast.error("discountedPrice should be greater than 0", {
        position: "top-right",
      });
      return;
    }

    if (currentSelectedProduct.quantity <= 0) {
      toast.error("Quantity should be more than 0", {
        position: "top-right",
      });
      return;
    }
    if (currentSelectedProduct.discountedPrice > currentSelectedProduct.price) {
      toast.error("discountedPrice should be less than price", {
        position: "top-right",
      });
      return;
    }
    updateProductService(
      currentSelectedProduct,
      currentSelectedProduct.productId
    )
      .then((data) => {
        console.log(data);
        toast.success("Product Updated Successfully");
        addProductImage(imageUpdate.image, currentSelectedProduct.productId)
          .then((data) => {
            console.log(data);
            toast.success("Image Updated Successfully");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error occured While updating the image");
          });
        if (
          selectedCategoryId === "none" ||
          selectedCategoryId === currentSelectedProduct.category?.categoryId
        ) {
        } else {
          updateProductCategory(
            selectedCategoryId,
            currentSelectedProduct.productId
          )
            .then((data) => {
              console.log(data);
              const newArray = products.content.map((product) => {
                if (product.productId === currentSelectedProduct.productId) {
                  return data;
                }
                return product;
              });
              setProducts({
                ...products,
                content: newArray,
              });
              toast.success("category updated successfully");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Category Not updated");
            });
        }

        const newArray = products.content.map((product) => {
          if (product.productId === currentSelectedProduct.productId) {
            return data;
          }
          return product;
        });
        setProducts({
          ...products,
          content: newArray,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured while updating the Product");
      });
    console.log(currentSelectedProduct);
  }

  function editProductModalView() {
    return currentSelectedProduct ? (
      <Modal
        size="xl"
        show={showEdit}
        onHide={closeEditProductModel}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{currentSelectedProduct.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              updateProduct(event);
            }}
          >
            <FormGroup className="mt-2">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter product title"
                value={currentSelectedProduct.title}
                onChange={(event) => {
                  setCurrentSelectedProduct({
                    ...currentSelectedProduct,
                    title: event.target.value,
                  });
                }}
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
                value={currentSelectedProduct.description}
                onEditorChange={(event) => {
                  setCurrentSelectedProduct({
                    ...currentSelectedProduct,
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
                    value={currentSelectedProduct.price}
                    onChange={(event) => {
                      setCurrentSelectedProduct({
                        ...currentSelectedProduct,
                        price: event.target.value,
                      });
                    }}
                  ></Form.Control>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mt-2">
                  <Form.Label>Product Discounted Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="enter product discounted price"
                    value={currentSelectedProduct.discountedPrice}
                    onChange={(event) => {
                      setCurrentSelectedProduct({
                        ...currentSelectedProduct,
                        discountedPrice: event.target.value,
                      });
                    }}
                  ></Form.Control>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-2">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter product quantity"
                value={currentSelectedProduct.quantity}
                onChange={(event) => {
                  setCurrentSelectedProduct({
                    ...currentSelectedProduct,
                    quantity: event.target.value,
                  });
                }}
              ></Form.Control>
            </FormGroup>
            <Row>
              <Col>
                <Form.Check
                  className="mt-3"
                  type="switch"
                  label="live"
                  checked={currentSelectedProduct.live}
                  onChange={(event) => {
                    setCurrentSelectedProduct({
                      ...currentSelectedProduct,
                      live: !currentSelectedProduct.live,
                    });
                  }}
                />
              </Col>
              <Col>
                <Form.Check
                  className="mt-3"
                  type="switch"
                  label="stock"
                  checked={currentSelectedProduct.stock}
                  onChange={(event) => {
                    setCurrentSelectedProduct({
                      ...currentSelectedProduct,
                      stock: !currentSelectedProduct.stock,
                    });
                  }}
                />
              </Col>
            </Row>
            <FormGroup className="mt-2">
              <Container className="text-center">
                <p>Image Preview</p>
                <img
                  src={
                    imageUpdate.imagePreview
                      ? imageUpdate.imagePreview
                      : getProductImageUrl(currentSelectedProduct.productId)
                  }
                  alt=""
                  className="img-fluid"
                  style={{
                    maxHeight: "250px",
                  }}
                />
              </Container>

              <Form.Label>Select Product Image</Form.Label>
              <InputGroup>
                <Form.Control
                  type="file"
                  onChange={(event) => {
                    handleFileChange(event);
                  }}
                ></Form.Control>
                <Button onClick={() => {}}>clear</Button>
              </InputGroup>
            </FormGroup>
            {/* {JSON.stringify(selectedCategory)} */}
            <FormGroup>
              <Form.Label>Categories</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setSelectedCategoryId(event.target.value);
                }}
              >
                <option value="None">None</option>
                {categories ? (
                  categories.content.map((cat) => {
                    return (
                      <option
                        selected={
                          cat.categoryId ===
                          currentSelectedProduct.category?.categoryId
                        }
                        value={cat.categoryId}
                        key={cat.categoryId}
                      >
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
              <Button type="submit" className="ms-2">
                Save Details
              </Button>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    ) : (
      ""
    );
  }

  function productViewModal() {
    return currentSelectedProduct ? (
      <>
        <Modal show={show} onHide={handleProductCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentSelectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="p-3">
              <img
                style={{
                  width: "100%",
                }}
                src={
                  currentSelectedProduct.productImageName
                    ? getProductImageUrl(currentSelectedProduct.productId)
                    : ""
                }
                alt=""
              />
            </Container>

            <div>
              <ShowHtml
                htmlText={currentSelectedProduct.description}
              ></ShowHtml>
            </div>

            <Table>
              <thead>
                <tr>
                  <th>Info</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Price</td>
                  <td>₹ {currentSelectedProduct.price}</td>
                </tr>
                <tr>
                  <td>Discounted Price</td>
                  <td>₹ {currentSelectedProduct.discountedPrice}</td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>
                    {currentSelectedProduct.stock ? "In Stock" : "Not In Stock"}
                  </td>
                </tr>
                <tr>
                  <td>Live</td>
                  <td>{currentSelectedProduct.live ? "Live" : "Not Live"}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{currentSelectedProduct.quantity}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{currentSelectedProduct.category?.title || "No"}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleProductCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    ) : (
      ""
    );
  }
  function getProducts(
    pageNumber = 0,
    pageSize = 3,
    sortBy = "addedDate",
    sortDir = "asc"
  ) {
    getAllproducts(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        setProducts(data);
        setPreservedProduct(data);
        toast.success("Product Fetched successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in fetching Product");
      });
  }

  function updateProductList(productId) {
    const newArr = products.content.filter((product) => {
      return product.productId !== productId;
    });
    setProducts({
      ...products,
      content: newArr,
    });
  }

  function searchPro() {
    if (searchQuery === undefined || searchQuery.trim() === "") {
      return;
    }
    searchProduct(searchQuery).then((data) => {
      if (data.content.length <= 0) {
        toast.warn("No Products Found");
      }
      setProducts(data);
    });
  }

  function productsView() {
    return (
      <Card>
        <Card.Body>
          <FormGroup className="mb-3">
            <Form.Label>Search Products</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search Your Products"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  if (event.target.value === "") {
                    setProducts(preservedProducts);
                  }
                }}
              ></Form.Control>
              <Button onClick={searchPro}>Search</Button>
            </InputGroup>
          </FormGroup>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th className="px-3 small">SN</th>
                <th className="px-3 small" colSpan={3}>
                  Title
                </th>
                <th className="px-3 small">Quantity</th>
                <th className="px-3 small">Price</th>
                <th className="px-3 small">Discount</th>
                <th className="px-3 small">Live</th>
                <th className="px-3 small">Stock</th>
                <th className="px-3 small">Category</th>
                <th className="px-3 small">Date</th>
                <th className="px-3 small">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.content.map((product, index) => {
                return (
                  <SingleProductView
                    key={index}
                    index={index}
                    product={product}
                    updateProductList={updateProductList}
                    handleProductShowModal={handleProductShowModal}
                    handleProductCloseModal={handleProductShowModal}
                    openEditProductModel={openEditProductModel}
                  />
                );
              })}
            </tbody>
          </Table>
          <Container className="d-flex justify-content-end">
            <Pagination>
              <Pagination.Prev
                onClick={() => {
                  if (products.pageNumber - 1 < 0) {
                    return;
                  }
                  getProducts(products.pageNumber - 1);
                }}
              ></Pagination.Prev>
              {/* calculating total Pages */}
              {[...Array(products.totalPages)]
                .map((obj, i) => i)
                .map((item) => {
                  return products.pageNumber === item ? (
                    <Pagination.Item
                      active
                      key={item}
                      onClick={() => {
                        getProducts(item);
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      key={item}
                      onClick={() => {
                        getProducts(item);
                      }}
                    >
                      {item}
                    </Pagination.Item>
                  );
                })}
              <Pagination.Next
                onClick={() => {
                  if (products.lastPage) {
                    return;
                  }
                  getProducts(products.pageNumber + 1);
                }}
              ></Pagination.Next>
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <Container className="fluid">
        <Row>
          <Col>{products ? productsView() : ""}</Col>
        </Row>
      </Container>
      {productViewModal()}
      {editProductModalView()}
    </div>
  );
}

export default ViewProducts;
