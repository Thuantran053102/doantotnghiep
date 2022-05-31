import React from 'react';
import PropTypes from 'prop-types';
import alertify from "alertifyjs";
import * as $ from 'jquery'
import * as utils from '../../utils/utils.js';
import { Alert } from 'bootstrap';
import { useEffect, useState } from "react";
import userApi from '../../api/User'
import { useNavigate } from "react-router-dom";
import clsx from "clsx"
import Dropdown from 'react-bootstrap/Dropdown'
import EditAccount from "./Edit/index";
// import Select from 'react-select'
import { Table } from 'react-bootstrap';
import AddAccount from "./Add/index";
import ResetPassword from "./ResetPassword/index";
import useFetch from '../../utils/customHook.js';
import Image from 'react-bootstrap/Image';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
Account.propTypes = {

};

function Account(props) {
    // window['jQuery'] = window['$'] = $;



    const [countReload, setCountReload] = useState(0);

    // Danh sách account
    const [accountList, setAccountList] = useState([
        // {
        //     fullName: 'Họ và tên',
        //     userName: 'Tên tài khoản',
        //     phoneNumber: '0909-xxx-xxx',
        //     avatar: 'avatar',
        //     role: 'Admin',
        //     email: 'email@gmail.com'
        // }
    ]);

    // Input
    const [inputValue, setInputValue] = useState('');

    // Role
    const [roleValue, setRoleValue] = useState('0');

    // Status
    const [statusValue, setStatusValue] = useState('0');

    // Show modal edit
    const [modalEdit, setModalEdit] = useState(false)
    const [modalResetPassword, setModalResetPassword] = useState(false)
    const [modalAddAccount, setModalAddAccount] = useState(false)

    // Id user
    const [infoUser, setInfoUser] = useState({})
    const [userId, setUserId] = useState()

    // Dữ liệu của select
    const [roleSelect, setRoleSelect] = useState([])

    useEffect(() => {
        const getRoles = async () => {
            try {
                const responseRole = await userApi.getRoles()
                setRoleSelect(responseRole.data)
            }
            catch (e) {
                console.error(e)
            }
        }
        getRoles()
    }, [])

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const params = {
                    keyword: inputValue,
                    positionId: roleValue,
                    statusId: statusValue,
                };
                const response = await userApi.getAll(params);
                if (response.isSuccess) {
                    setAccountList(response.data)
                }
                // console.log(accountList)
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
    }, [inputValue, roleValue, statusValue, countReload])

    // Reload ttable account
    function reloadTable() {
        let number = countReload
        number++;
        setCountReload(number)
        setInputValue('')
        setRoleValue('0')
        setStatusValue('0')
    }

    /*Hiển thị modal edit*/
    function showModalEdit(id) {
        setModalEdit(true);
        const getInfoUser = async () => {
            try {
                const response = await userApi.get(id)
                if (response.isSuccess) {
                    setInfoUser(response.data)
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        getInfoUser();
    }

    // Modal
    function setModalFalse() {
        setModalEdit(false);
        setModalResetPassword(false)
        setModalAddAccount(false)
    }

    // Đổi mật khẩu
    function changePassword(id) {
        setModalResetPassword(true);
        setUserId(id);
    }

    // Khóa - Mở khóa tài khoản 
    function toggleStatus(id, curentStatus, fullName) {
        let newSttName = curentStatus == 1 ? 'Khóa' : 'Mở khóa'
        alertify.confirm("Xác nhận '' " + newSttName + " '' tài khoản '' " + fullName + " ''", function () {
            const lockStatus = async () => {
                try {
                    const response = newSttName === 'Khóa' ? await userApi.lock(id) : await userApi.unLock(id)
                    if (response.isSuccess) {
                        reloadTable();
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            lockStatus();
        })
    }
    return (
        <>
            {/* <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <button onClick={() => setModalAddAccount(true)} type="button" className="btn btn-primary"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm tài khoản</button>
                            </div>
                            <h4 className="page-title">Tài khoản hệ thống</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="page-aside-left p-0">
                                    <button onClick={() => reloadTable()} type="button" className="btn btn-block btn-primary"><i className="mdi mdi-refresh font-16 mr-1"></i>Làm mới dữ liệu</button>
                                    {/* <!-- Search --> */}
                                    <div className="mt-4">
                                        <h5 className="text-primary">Tìm kiếm</h5>
                                        <div className="form-group">
                                            <input id="ipt-text-search" type="text" className="form-control" placeholder="Nhập thông tin cần tìm" autoComplete="off" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="text-primary">Chức vụ</h5>
                                        <select className="form-control " id="sl-role" onChange={(e) => setRoleValue(e.target.value)} value={roleValue}>
                                            <option value='0'> Tất cả </option>
                                            {
                                                roleSelect.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="text-primary">Trạng thái</h5>
                                        <div className="form-group">
                                            <select className="form-control " id="sl-status" onChange={(e) => setStatusValue(e.target.value)} value={statusValue}>
                                                <option value="0"> Tất cả </option>
                                                <option value="1"> Đang hoạt động </option>
                                                <option value="2"> Đã khóa </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-aside-right">
                                    {/* <!-- Table --> */}
                                    <Table striped responsive="lg" id="products-datatable">
                                        <thead>
                                            <tr>
                                                <th className="stt">
                                                    #
                                                </th>
                                                <th></th>
                                                <th>Họ và tên</th>
                                                <th>Điện thoại</th>
                                                <th>Email</th>
                                                <th>Tài khoản</th>
                                                <th>Chức vụ</th>
                                                <th>Trạng thái</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbl-body">
                                            {
                                                accountList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="align-middle">{index + 1}</td>
                                                        <td className="align-middle ">
                                                            <Image src={item.avatar !== '' ? process.env.REACT_APP_API_URL + item.avatar : "/images/default-avatar.jpg"} thumbnail={true} roundedCircle={true} width='60' height='60' />
                                                        </td>
                                                        <td className="align-middle ">{item.fullName}</td>
                                                        <td className="align-middle">{item.phoneNumber}</td>
                                                        <td className="align-middle">{item.email}</td>
                                                        <td className="align-middle">{item.userName}</td>
                                                        <td className="align-middle">{item.name}</td>
                                                        <td className="align-middle">
                                                            <span className={clsx('badge', item.status === 1 ? 'badge-success-lighten' : 'badge-danger-lighten')}>{(item.status == 1 ? 'Đang hoạt động' : 'Khóa')}</span>
                                                        </td>
                                                        <td className=" text-center align-middle ">
                                                            <Dropdown className="d-inline mx-2">
                                                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                                                    <i className="text-light mdi mdi-dots-vertical font-18 text-primary"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu style={{ margin: 0 }}>
                                                                    <Dropdown.Item onClick={() => showModalEdit(item.id)}><i className="mdi mdi-window-restore "></i>Chi tiết</Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick={() => changePassword(item.id)} ><i className="mdi mdi-lock-reset "></i>Đặt lại mật khẩu</Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick={() => toggleStatus(item.id, item.status, item.fullName)}><i className="mdi mdi-lock-outline "></i>{item.status === 1 ? 'Khóa' : 'Mở khóa'}</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal đổi mật khẩu */}
            <ResetPassword show={modalResetPassword} userId={userId} setModalFalse={setModalFalse} reloadTable={reloadTable} />

            {/* Modal tạo tài khoản */}
            <AddAccount show={modalAddAccount} setModalFalse={setModalFalse} reloadTable={reloadTable} />

            {/* Modal chỉnh sửa tài khoản */}
            <EditAccount show={modalEdit} infoUser={infoUser} setModalFalse={setModalFalse} reloadTable={reloadTable} />



        </>
    );
}

export default Account;