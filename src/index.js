import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";

import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const TRACKING_ID = "G-WZ99Q18Z5P";
ReactGA.initialize(TRACKING_ID);
ReactGA.send("pageview");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
