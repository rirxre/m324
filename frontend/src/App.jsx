import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo.jsx"; // .jsx-Endung hinzugefügt

function App() {
  return (
    <div>
      <h1 className="text-center">Todo List</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
