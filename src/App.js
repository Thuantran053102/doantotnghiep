import { Route, Routes, Link } from 'react-router-dom';
import 'react-bootstrap';
import Addproduct from "./views/Product/Addproduct"
import Product from "./views/Product"
import Login from "./views/Login/index";
import Account from "./views/Account/index";
import Navbar from "./views/Navbar/index";
import Post from "./views/Post"
import Edit from './views/Post/edit';
import './App.scss'




function App() {
  return (
   <>
   {/* <Navbar/> */}
     <Account/>
   </>
  );

}

export default App;