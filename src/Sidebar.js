import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(["All", ...response.data]); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} >
            {category}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
