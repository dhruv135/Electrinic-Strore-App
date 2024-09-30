import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  ListGroup,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import { useParams, Link, NavLink } from "react-router-dom";
import { getProductsByCategory } from "../../Service/product.service";
import { toast } from "react-toastify";
import SingleProductCard from "./SingleProductCard";
import { getCategories } from "../../Service/Category.Service";

function CategoryStorePage() {
  const { categoryId, categoryTitle } = useParams();
  const [products, setProducts] = useState(null);

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    loadCategories(0, 10000);
    loadProductByCategory(categoryId);
  }, [categoryId]);

  function loadCategories(pageNumber, pageSize) {
    getCategories(pageNumber, pageSize)
      .then((data) => {
        console.log(data);
        setCategories({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured while loading the categories");
      });
  }

  const loadProductByCategory = (
    categoryId,
    pageNumber,
    pageSize,
    sortBy,
    sortDir
  ) => {
    getProductsByCategory(categoryId, pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);

        setProducts({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occured while fetching the product");
      });
  };

  function viewProduct() {
    return (
      products && (
        <>
          <Row>
            {products.content.map((product) => {
              return (
                <Col key={product.productId} md={4}>
                  <SingleProductCard product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )
    );
  }

  function viewCategory() {
    return (
      categories && (
        <>
          <ListGroup className="flush mt-3">
            <ListGroup.Item action as={Link} to={`/store`}>
              <span className="ms-2">All Products</span>
            </ListGroup.Item>

            {categories.content.map((cat) => {
              return (
                <>
                  <ListGroup.Item
                    action
                    key={cat.categoryId}
                    as={Link}
                    to={`/store/${cat.categoryId}/${cat.title}`}
                  >
                    <img
                      src={cat.coverImage}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <span className="ms-2">{cat.title}</span>
                  </ListGroup.Item>
                </>
              );
            })}
          </ListGroup>
        </>
      )
    );
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>{viewCategory()}</Col>
          <Col md={10}>
            <Breadcrumb>
              <BreadcrumbItem>Store</BreadcrumbItem>
              <BreadcrumbItem>{categoryTitle}</BreadcrumbItem>
            </Breadcrumb>
            {products?.content.length ? (
              viewProduct()
            ) : (
              <h1>No Products are available in this category</h1>
            )}{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CategoryStorePage;
