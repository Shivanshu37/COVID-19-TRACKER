import React, { useEffect, useState } from "react";
import "./styles.css";
import Table from "./tableData.js";
import Heading from "./heading.jsx";

export default function App() {
  return (
    <div className="App">
      <Heading className="headingPosition" />
      <Table />
    </div>
  );
}
