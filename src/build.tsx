/// <reference path="../typings/tsd.d.ts" />
window.location.hash = "";
import * as React from "react";
import * as ReactDOM from "react-dom";
import  "plupload";
// import  'swiper';
import  "../assets/css/bootstrap.min.css";
import  "../assets/layer_mobile/layer.css"
// import  '../node_modules/swiper/dist/css/swiper.min.css';
import  "../assets/layer_mobile/layer.js";
import  "../assets/css/style.css";

import { App } from "./components/App";
ReactDOM.render(
    <App></App>
    ,
    document.getElementById("app")
);