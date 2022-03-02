import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap'
import $ from 'jquery';
import alertify from 'alertifyjs';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import async from 'async';
// import Dashboard from '../Dashboard';


Login.propTypes = {

};

function Login(props) {
     alertify.alert().setting({
          'label': '<i class="mdi mdi-check mr-1"></i>Xác nhận',
          'title': 'Thông báo'
     });

     $(function () {
          $('#ipt-username, #ipt-password').on('keydown', function (e) {
               if (e.keyCode === 13) {
                    login();
               }
          })
     })



     let navigate = useNavigate();
     const [userName, setUserName] = useState('')
     const [password, setPassword] = useState('')
     async function loginTest() {
          let user = { userName, password }
          let result = await fetch('https://192.168.0.142:9090/api/User/user-login', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(user)
          })
               .then(response => response.json())
               .then(response => {
                    if (response.isSuccess) {
                         localStorage.setItem('user-token', JSON.stringify(response.data))
                         navigate('/admin/dashboard')
                    }
                    else {
                         alertify.alert('Thông tin tài khoản không đúng')
                    }
               })
     }
     function login() {
          let user = $('#ipt-username').val();
          let pass = $('#ipt-password').val();
          if (user == '') {
               alertify.alert('Tài khoản không được để trống')
          } else if (pass == '') {
               alertify.alert('Mật khẩu không được để trống')
          } else {

               let d = {
                    UserName: user,
                    Password: pass,
               }
               loginTest()
          }
     }
     const Login1 =()=>{
          console.log("thuan tran van")
     }
     return (

          <div className="authentication-bg">
               <div className="account-pages pt-5 mb-5">
                    <div className="container">
                         <div className="row justify-content-center">
                              <div className="col-lg-4">
                                   <div className="card">
                                        <div className="card-header pt-2 pb-2 text-center">
                                             <a href="/admin"><span><img src="/images/logo.png" alt='' className="w-100" /></span></a>
                                        </div>
                                        <div className="card-body p-4">
                                             <div className="text-center w-75 m-auto">
                                                  <h4 className="mb-2">Đăng nhập</h4>
                                             </div>
                                             <div>
                                                  <div className="form-group">
                                                       <label>Tài khoản</label>
                                                       <input id="ipt-username" onChange={(e) => setUserName(e.target.value)}
                                                            className="form-control" tabIndex={1} type="text" placeholder="Tài khoản" autoFocus />
                                                  </div>
                                                  <div className="form-group">
                                                       <label>Mật khẩu</label>
                                                       <input id="ipt-password" onChange={(e) => setPassword(e.target.value)}
                                                            type="password" tabIndex={2} className="form-control" placeholder="Mật khẩu" autoComplete="off" />
                                                  </div>

                                                  <div className="form-group mb-0 w-100 mt-3 text-center">

                                                       <button onClick={login} className="btn btn-primary" tabIndex={4}><i className="mdi mdi-login mr-1"></i>Đăng nhập </button>


                                                  </div>

                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="footer footer-alt">2022 &copy; Nguyễn Minh Hiếu - Trần Văn Thuận - Huỳnh Văn Thảo</div>

               {/* <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
               </Routes> */}
               {/* <script src="/assets/js/vendor.min.js"></script>
               <script src="/assets/js/i18n/vi.js"></script>
               <script src="/plugins/alertify/alertify.min.js"></script>
               <script src="~/lib/jquery/jquery.js"></script> */}
          </div>

     );
}

export default Login;