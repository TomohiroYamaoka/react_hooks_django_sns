import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter } from "react-route-dom";
import Login from "./components/Login";
import { CookieProvider } from "react-cookie";

const routing = (
  <React.StrictMode>
    <BrowserRouter>
      <CookieProvider>
        <Route exact path="/" component={Login} />
        <Route exact path="/profiles" component={App} />
      </CookieProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
