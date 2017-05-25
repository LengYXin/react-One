/// <reference path="../typings/tsd.d.ts" />
window.location.hash = "";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
ReactDOM.render(
    <App></App>
    ,
    document.getElementById("app")
);