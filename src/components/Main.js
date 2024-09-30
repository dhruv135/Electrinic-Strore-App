import React, { useState } from "react";
import Base from "./Base";
import {
  infoWithImageSection,
  trendingProducts,
} from "../pages/HomePageComponent";

function Main() {
  const [products, setProducts] = useState([
    {
      productId: "b8990fde-f1bc-4565-a3e6-4a6d54c764fb",
      title: "SAMSUNG Galaxy S23 5G (Phantom Black, 128 GB)  (8 GB RAM)",
      description: "",
      price: 90000,
      discountedPrice: 85000,
      quantity: 5,
      addedDate: 1725714247399,
      live: true,
      stock: true,
      productImageName: "6a6104f1-b4c3-4e36-83af-877204c41604.jpeg",
      category: {
        categoryId: "c03a224f-76ff-4c13-8d42-435941ed8e6f",
        title: "Samsung Phones",
        description:
          "Samsung is a global leader in technology, opening new possibilities for people everywhere. Through relentless innovation and discovery, they are transforming the worlds of TVs, smartphones, wearable devices, tablets, digital appliances, network systems, medical devices, semiconductors, and LED solutions.",
        coverImage:
          "https://images.samsung.com/is/image/samsung/assets/in/explore/brand/5-best-android-mobile-phones-2022-in-india/banner-mobile-720x761-080422.jpg?$720_N_JPG$",
      },
    },
    {
      productId: "b488724b-12eb-4473-82e0-74f570f5efae",
      title: "SAMSUNG Galaxy S24 5G (Amber Yellow, 256 GB)  (8 GB RAM)",
      description: "",
      price: 100000,
      discountedPrice: 90000,
      quantity: 15,
      addedDate: 1725714389425,
      live: true,
      stock: true,
      productImageName: "eb1e99e7-06d6-477f-b19a-8f160152a1c5.jpeg",
      category: {
        categoryId: "c03a224f-76ff-4c13-8d42-435941ed8e6f",
        title: "Samsung Phones",
        description:
          "Samsung is a global leader in technology, opening new possibilities for people everywhere. Through relentless innovation and discovery, they are transforming the worlds of TVs, smartphones, wearable devices, tablets, digital appliances, network systems, medical devices, semiconductors, and LED solutions.",
        coverImage:
          "https://images.samsung.com/is/image/samsung/assets/in/explore/brand/5-best-android-mobile-phones-2022-in-india/banner-mobile-720x761-080422.jpg?$720_N_JPG$",
      },
    },
    {
      productId: "5a576ca8-00a6-44c9-8040-aaa0ae544c20",
      title: "SAMSUNG Galaxy S24 Ultra 5G (Titanium Gray, 1 TB)  (12 GB RAM)",
      description: "",
      price: 150000,
      discountedPrice: 135000,
      quantity: 6,
      addedDate: 1725714494611,
      live: true,
      stock: true,
      productImageName: "edd53936-7f99-44e9-b7f3-4bdd57e54fee.jpeg",
      category: {
        categoryId: "c03a224f-76ff-4c13-8d42-435941ed8e6f",
        title: "Samsung Phones",
        description:
          "Samsung is a global leader in technology, opening new possibilities for people everywhere. Through relentless innovation and discovery, they are transforming the worlds of TVs, smartphones, wearable devices, tablets, digital appliances, network systems, medical devices, semiconductors, and LED solutions.",
        coverImage:
          "https://images.samsung.com/is/image/samsung/assets/in/explore/brand/5-best-android-mobile-phones-2022-in-india/banner-mobile-720x761-080422.jpg?$720_N_JPG$",
      },
    },
  ]);

  return (
    <Base>
      <div className="my-4">{trendingProducts(products)}</div>
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        {infoWithImageSection(
          "https://picsum.photos/200/300",

          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "Some Title"
        )}
      </div>
    </Base>
  );
}

export default Main;
