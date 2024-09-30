import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  ListGroup,
  Row,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import { getCategories } from "../../Service/Category.Service";
import { toast } from "react-toastify";
import { getAllproducts } from "../../Service/product.service";
import SingleProductCard from "./SingleProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

function Store() {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadCategories(0, 10000);
    loadProducts(currentPage, 6);
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      loadProducts(currentPage, 6);
    }
  }, [currentPage]);

  function loadNextpage() {
    setCurrentPage(currentPage + 1);
  }

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

  function loadProducts(pageNumber, pageSize) {
    console.log(currentPage);
    getAllproducts(pageNumber, pageSize)
      .then((data) => {
        console.log(data);

        if (currentPage > 0) {
          setProducts({
            content: [...products.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        } else {
          setProducts({ ...data });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in Loading the Products");
      });
  }

  function viewCategory() {
    return (
      categories && (
        <>
          <ListGroup className="flush mt-3">
            <ListGroup.Item action as={Link} to={"/store"}>
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

  function viewProduct() {
    return (
      products && (
        <>
          <InfiniteScroll
            dataLength={products.content.length}
            next={loadNextpage}
            loader={
              <h3 className="my-5 text-center">Loading more products....</h3>
            }
            endMessage={
              <h3 className="text-center">All products are loaded.....</h3>
            }
            hasMore={!products.lastPage}
          >
            <Row>
              {products.content.map((product) => {
                return (
                  <Col key={product.productId} md={4}>
                    <SingleProductCard product={product} />
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
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
              <BreadcrumbItem>{"All Products"}</BreadcrumbItem>
            </Breadcrumb>
            {viewProduct()}{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Store;
