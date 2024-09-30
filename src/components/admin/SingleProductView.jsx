import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { deleteProduct } from "../../Service/product.service";
import Swal from "sweetalert2";

function SingleProductView({
  index,
  product,
  updateProductList,
  handleProductShowModal,
  openEditProductModel,
}) {
  function formatdate(time) {
    return new Date(time).toLocaleDateString();
  }

  const getBackGroundForProduct = () => {
    if (product.stock && product.live) {
      return "table-success";
    } else if (!product.live) {
      return "table-danger";
    } else if (!product.stock) {
      return "table-warning";
    } else {
      return "";
    }
  };

  function deletePro(productId) {
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
        deleteProduct(productId)
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            updateProductList(productId);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <tr className={getBackGroundForProduct()}>
      <td className="px-3 small">{index + 1}</td>
      <td className="px-3 small" colSpan={3}>
        {product.title}
      </td>
      <td className="px-3 small">{product.quantity}</td>
      <td className="px-3 small">₹ {product.price}</td>
      <td className="px-3 small">₹ {product.discountedPrice}</td>
      <td className="px-3 small">{product.live ? "Live" : "Not Live"}</td>
      <td className="px-3 small">
        {product.stock ? "In Stock" : "Not In Stock"}
      </td>
      <td className="px-3 small">
        {product.category ? product.category.title : "null"}
      </td>
      <td className="px-3 small">{formatdate(product.addedDate)}</td>
      <td className="d-flex">
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            deletePro(product.productId);
          }}
        >
          <MdDeleteOutline />
        </Button>
        <Button
          size="sm"
          variant="warning"
          className="ms-2"
          onClick={() => {
            handleProductShowModal(product);
          }}
        >
          <GrOverview />
        </Button>
        <Button
          size="sm"
          className="ms-2"
          onClick={() => {
            openEditProductModel(product);
          }}
        >
          <BsPencilSquare />
        </Button>
      </td>
    </tr>
  );
}

export default SingleProductView;
