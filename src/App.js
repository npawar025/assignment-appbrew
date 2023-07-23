import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Product from "./Product";

function App() {

  return (
    <div className="app">
      <Navbar />
      <div className="side">
        <Sidebar />
      </div>
      <div className="prod">
        <Product />
      </div>
    </div>
  );
}

export default App;
