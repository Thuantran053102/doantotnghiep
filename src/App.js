import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'react-bootstrap';
import Addproduct from "./views/Product/Addproduct"
import Product from "./views/Product"
import Login from "./views/Login/index";
import Account from "./views/Account/index";
import Navbar from "./views/Navbar/index";
import Post from "./views/Post"
import Edit from './views/Post/edit';
import './App.scss';
import axiosClient from "./api/axiosClient"
import AddPost from "./views/Post/add"
import AddAccount from "./views/Account/Add/index";
import * as $ from "jquery" 
import Dashboard from "./views/Dashboard";
import Footer from "./views/Footer/index";

require('bootstrap');

function App() {

  
  return (
    // <Navbar/>
    // <BrowserRouter >
    //   <Routes>
    //   {/* <Route path="/" element={<Login/>}/> */}
    //   <Route path="/admin" element={<Login/>}/>
    //     <Route path="/admin/dashboard" element={<Dashboard/>}/>

    //   </Routes>
    //     <Footer/>
    // </BrowserRouter>
  <Account/>
  );


}

export default App;