import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./App"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreProvider from './store'
import Navbar from "./views/Navbar";
import Footer from "./views/Footer";
import Login from "./views/Login/index";
import Dashboard from "./views/Dashboard/index";

ReactDOM.render(
    <React.StrictMode >
       <App/>
    </React.StrictMode >,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();