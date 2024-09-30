import React, { useState } from "react";
import { useEffect } from "react";
import { getALlUsers } from "../../Service/user.service";
import { toast } from "react-toastify";
import { Card, Col, Container, Row } from "react-bootstrap";
import SingleUserView from "../../components/SingleUserView";
import InfiniteScroll from "react-infinite-scroll-component";

function AdminUsers() {
  const [users, setUsers] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getUsers(0, 5, "name", "asc");
  }, []);

  function loadNextPage() {
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    if (currentPage > 0) {
      getUsers(currentPage, 5, "name", "asc");
    }
  }, [currentPage]);

  const userView = () => {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h3>User List</h3>
                  <InfiniteScroll
                    dataLength={users.content.length}
                    next={loadNextPage}
                    loader={<p>Loading....</p>}
                    endMessage={<p>ALl users Loaded</p>}
                    hasMore={!users.lastPage}
                  >
                    {users.content.map((user) => {
                      return <SingleUserView user={user}></SingleUserView>;
                    })}
                  </InfiniteScroll>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  function getUsers(pageNumber, pageSize, sortBy, sortDir) {
    getALlUsers(pageNumber, pageSize, sortBy, sortDir)
      .then((data) => {
        console.log(data);
        if (currentPage === 0) {
          setUsers({
            ...data,
          });
        } else {
          setUsers({
            content: [...users.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
          });
        }
        toast.success("Users fetched Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not able to fetch users");
      });
  }

  return <div>{users && userView()}</div>;
}

export default AdminUsers;
