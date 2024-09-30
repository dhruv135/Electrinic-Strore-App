import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import UserContext from "./user.context";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
} from "../Service/cart.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CartProvider({ children }) {
  const { isLogin, userData } = useContext(UserContext);

  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (isLogin) {
      loadUserCart(userData.user.userId);
    } else {
      setCartData(null);
    }
  }, [isLogin]);

  const loadUserCart = (userId) => {
    getCart(userId)
      .then((data) => {
        setCartData({ ...data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        //toast.error("Error occured While Loading the cart");
        setCartData({ items: [] });
        console.log(cartData);
      });
  };

  const addItem = (productId, quantity, cllbk) => {
    if (!isLogin) {
      Swal.fire(
        "Not Logged In",
        "Please Login to Add to Cart And Enjoy Shoping!!!"
      );
      return;
    }

    addItemToCart(userData?.user?.userId, productId, quantity)
      .then((data) => {
        console.log(data);
        cllbk();
        setCartData({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not able to add it in cart");
      });
  };

  const removeItem = (itemId) => {
    removeItemFromCart(userData.user.userId, itemId)
      .then((data) => {
        const newItems = cartData.items.filter(
          (item) => item.cartItemId !== itemId
        );
        setCartData({
          ...cartData,
          items: newItems,
        });
        toast.success("Item removed successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not able to remove item");
      });
  };

  const clrCart = () => {
    clearCart(userData.user.userId)
      .then((data) => {
        console.log(data);
        toast.success("Item cleared successfully");
      })
      .catch((error) => {
        toast.error("Not able to clear cart");
      });
  };

  return (
    <div>
      <CartContext.Provider
        value={{ cartData, setCartData, addItem, removeItem, clrCart }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default CartProvider;
