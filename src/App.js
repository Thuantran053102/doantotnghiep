import { Route, Routes, Link } from 'react-router-dom';
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


function App() {
  
  return (
   <>
   {/* <Navbar/> */}
    <AddPost/>
   </>
  );

}

export default App;