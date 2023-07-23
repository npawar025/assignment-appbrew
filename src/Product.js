import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const apiUrl = "https://dummyjson.com/products";
const productsPerPage = 20;

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </div>
      <h3>{product.title}</h3>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get(apiUrl);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-container">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="pagination-container">
        <button
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                index + 1 === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className={`pagination-button ${
            currentPage === Math.ceil(products.length / productsPerPage)
              ? "disabled"
              : ""
          }`}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;
