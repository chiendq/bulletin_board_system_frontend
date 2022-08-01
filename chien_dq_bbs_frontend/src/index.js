import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {NewPost} from "./pages/newPost/NewPost";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<App/>} />
              <Route path={'/login'} element={<Login/>} />
              <Route path={'/newPost'} element={<NewPost/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
