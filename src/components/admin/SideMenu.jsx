import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";
import { TbBorderSides } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import UserContext from "../../context/user.context";

function SideMenu() {
  const { logout } = useContext(UserContext);

  return (
    <div className="sticky-top mt-2">
      <ListGroup>
        <ListGroup.Item as={NavLink} to="/admin/adminHome">
          <IoMdHome height={20} width={20} />
          <span className="ms-2">Dashboard Graphs</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/addCategory">
          <TbCategoryPlus height={20} />
          <span className="ms-2">Add category</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/categories">
          <BiCategory height={20} />
          <span className="ms-2">View Categories</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/addProduct">
          <IoIosAddCircleOutline height={20} />
          <span className="ms-2">Add Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/products">
          <FaProductHunt height={20} />
          <span className="ms-2">View Products</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/orders">
          <TbBorderSides height={20} />
          <span className="ms-2">Orders</span>
        </ListGroup.Item>
        <ListGroup.Item as={NavLink} to="/admin/users">
          <FaUsers height={20} />
          <span className="ms-2">Users</span>
        </ListGroup.Item>

        {/* <ListGroup.Item
          as={NavLink}
          onClick={() => {
            logout();
          }}
        >
          <RxDashboard height={20} />
          <span className="ms-2">Logout</span>
        </ListGroup.Item> */}
      </ListGroup>
    </div>
  );
}

export default SideMenu;
