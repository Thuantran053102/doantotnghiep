import React from 'react';
import PropTypes from 'prop-types';
import alertify from "alertifyjs";
import $ from 'jquery';
import * as utils from '../../utils/utils.js';
import { Alert } from 'bootstrap';
import { useEffect, useState } from "react";
import userApi from '../../api/User'
import { useNavigate } from "react-router-dom";
import clsx from "clsx"
import Dropdown from 'react-bootstrap/Dropdown'
import EditAccount from "./Edit/index";
import Select from 'react-select'
import { Table } from 'react-bootstrap';
import AddAccount from "./Add/index";
import ResetPassword from "./ResetPassword/index";
import useFetch from '../../utils/customHook.js';
Account.propTypes = {

};

function Account(props) {

    const [countReload, setCountReload] = useState(0);

    // Danh sách account
    const [accountList, setAccountList] = useState([]);

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
    // console.log('infouser first:', infoUser)

    // Dữ liệu của select
    const [roleSelect, setRoleSelect] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const params = {
                    keyword: inputValue,
                    positionId: roleValue,
                    statusId: statusValue,
                };
                const response = await userApi.getAll(params);
                const responseRole = await userApi.getRoles()
                setAccountList(response.data)
                setRoleSelect(responseRole.data)
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
    }, [inputValue, roleValue, statusValue, countReload])

    function reloadTable() {
        console.log('reload')
        let number = countReload
        number++;
        setCountReload(number)
        setInputValue('')
        setRoleValue('0')
        setStatusValue('0')
    }


    const $imgAvatarAdd = $("#img-avatar-add");
    const $imgAvatarEdit = $("#img-avatar-edit");
    const $formEdit = $("#form-edit");





    var CURRENT_IMG_PATH = "";
    var CURRENT_USER_ID = 0;
    /*Binding file add */
    // INIT_FILE_MANAGE("#img-avatar-add", function (res) {
    //     CURRENT_IMG_PATH = res.ThumbNailPath;
    //     $("#img-avatar-add").attr('src', "/" + res.ThumbNailPath)
    // })
    // /*Binding file edit  */
    // INIT_FILE_MANAGE("#img-avatar-edit", function (res) {
    //     CURRENT_IMG_PATH = res.ThumbNailPath;
    //     $("#img-avatar-edit").attr('src', "/" + res.ThumbNailPath)
    // })
    function handleModalAddSubmit(e) {
        //     e.preventDefault();
        //     var user = utils.formToObject('#form-add');
        //     let error = null;
        //     if (utils.IsNullOrEmpty(user.FullName))
        //         error = "Họ tên không được để trông";
        //     else if (utils.IsNullOrEmpty(user.UserName))
        //         error = "Tên tài khoản không được để trống";
        //     else if (utils.IsNullOrEmpty(user.Password) || user.Password.length < 6)
        //         error = "Mật khẩu không được nhỏ hơn 6 kí tự";
        //     else if (utils.IsNullOrEmpty(user.RoleId))
        //         error = "Chưa chọn vị trí";
        //     if (error != null) {
        //         alertify.alert(error);
        //     } else {
        //         user.RoleId = parseInt(user.RoleId);
        //         user.Avatar = CURRENT_IMG_PATH;
        //         utils.ajaxPost('User', user,
        //             function (rs) {
        //                 if (rs.IsSuccess) {
        //                     $('#form-add')[0].reset();
        //                     $imgAvatarAdd.attr('src', '/images/default-image.png');
        //                     alertify.success("Thêm thành công")
        //                     utils.hideModal('#modal-add')
        //                     $('#form-add').trigger('reset');
        //                     CURRENT_IMG_PATH = null;
        //                     reloadTable();
        //                 } else {
        //                     alertify.error(rs.Message);
        //                 }
        //             }
        //         );
        //     }

    };

    /*Binding file edit  */
    function handleModalEditSubmit(e) {
        //     e.preventDefault();
        //     var user = utils.formToObject('#form-edit');
        //     let error = null;
        //     if (utils.IsNullOrEmpty(user.FullName))
        //         error = "Họ tên không được để trông";
        //     else if (utils.IsNullOrEmpty(user.UserName))
        //         error = "Tên tài khoản không được để trống";
        //     else if (utils.IsNullOrEmpty(user.RoleId))
        //         error = "Chưa chọn vị trí";
        //     if (error != null) {
        //         alertify.alert(error);
        //     } else {
        //         user.RoleId = parseInt(user.RoleId);
        //         user.Avatar = CURRENT_IMG_PATH;
        //         user.Id = CURRENT_USER_ID;
        //         utils.ajaxPut('User/' + CURRENT_USER_ID, user,
        //             function (rs) {
        //                 if (rs.IsSuccess) {
        //                     alertify.success("Cập nhật thành công")
        //                     CURRENT_IMG_PATH = null;
        //                     utils.hideModal('#modal-edit')
        //                     $('#form-edit').trigger('reset');
        //                     reloadTable();
        //                 } else {
        //                     alertify.error(rs.Message);
        //                 }
        //             }
        //         );
        //     }
    };


    // /*Binding search */
    // $('#ipt-text-search').on('keypress', function (e) {
    //     setTimeout(function () {
    //         var KEY_WORD = e.target.value;
    //         reloadTable();
    //     }, 200)
    // });

    // /*Binding change role */
    // $('#sl-role').change(() => reloadTable());

    // /*Binding change status */
    // $('#sl-status').change(() => reloadTable());

    // /*Binding search */
    // $('#btn-delete').on('click', function (e) {
    //     alertify.confirm("Xác nhận xóa tài khoản", function () {
    //         utils.ajaxDelete('User/' + CURRENT_USER_ID, function (res) {
    //             if (res.IsSuccess) {
    //                 alertify.success("Xóa thành công")
    //                 reloadTable()
    //                 utils.hideModal('#modal-edit');
    //             }
    //             else alertify.error(res.Message);
    //         });
    //     });
    // });

    /*FUNCTION*/

    /*Hiển thị modal edit*/
    function showModalEdit(id) {
        setModalEdit(true);
        const getInfoUser = async () => {
            try {
                const response = await userApi.get(id)
                if (response.isSuccess) {
                    // console.log('res: ', response.data)
                    setInfoUser(response.data)
                    // console.log('info:', infoUser)
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        getInfoUser();
        // try {
        //     CURRENT_USER_ID = id;
        //     utils.ajaxGet('User/' + id, null, function (res) {
        //         if (res.IsSuccess) {
        //             let data = res.Result;
        //             CURRENT_IMG_PATH = utils.getImagePath(data.Avatar);
        //             $formEdit.find('input[name="FullName"]').val(data.FullName);
        //             $formEdit.find('input[name="Phone"]').val(data.Phone);
        //             $formEdit.find('input[name="Email"]').val(data.Email);
        //             $formEdit.find('input[name="UserName"]').val(data.UserName);
        //             $formEdit.find('select[name="RoleId"]').val(data.RoleId);
        //             $imgAvatarEdit.attr('src', utils.getImagePath(CURRENT_IMG_PATH));
        //             utils.showModal('#modal-edit');

        //         } else {
        //             alertify.error(res.Message);
        //         }
        //     });

        // } catch (e) {
        //     alertify.error("Có lỗi xảy ra");
        // }
        // utils.showModal("#modal-edit");
    }
    function setModalFalse() {
        setModalEdit(false);
        setModalResetPassword(false)
        setModalAddAccount(false)
        // setUserName();
    }



    function initSelectRole() {

        let html = "";
        utils.ajaxGet('user/GetAllPosition', '', function (res) {
            if (res.IsSuccess) {
                var data = res.Result;
                html += data.map(n => `<option value="${n.Id}">${n.Name}</option>`);
                $("#sl-role-add").html(html);
                $("#sl-role-edit").html(html);
                $("#sl-role").append(html);
            }
        })


    }

    function changePassword(id) {
        setModalResetPassword(true);
        // utils.showModal('#modal-change-pass');
        // $("#form-change-pass").trigger("reset");
        // $('#modal-change-pass').find("#form-change-pass").unbind().on('submit', function (e) {
        //     e.preventDefault();
        //     let text = utils.formToObject("#form-change-pass").Password;
        //     if (utils.IsNullOrEmpty(text) || text.length < 6)
        //         alertify.error("Mật khẩu không được nhỏ hơn 6 kí tự");
        //     else {
        //         utils.ajaxPost('User/ResetPassword/' + id, {
        //             NewPassword: text
        //         }, function (res) {
        //             if (res.IsSuccess) {
        //                 alertify.alert("Đổi mật khẩu thành công")
        //                 utils.hideModal('#modal-change-pass');
        //             }
        //         })
        //     }
        // })
    }
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
                                        {/* <Select blurInputOnSelect={true} value={optionsRole[0]} options={optionsRole} onChange={(val) => { setRoleValue({ target: { name: val.name, value: val.value } }) }} /> */}
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
                                    {/* className="table table-centered table-hover dt-responsive nowrap w-100" */}
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
                                                            <img src="${utils.getImagePath(item.avatar)}" className="mr-2 rounded-circle" />
                                                        </td>
                                                        <td className="align-middle ">{item.fullName}</td>
                                                        <td className="align-middle">{item.phoneNumber}</td>
                                                        <td className="align-middle">{item.email}</td>
                                                        <td className="align-middle">{item.userName}</td>
                                                        <td className="align-middle">{item.name}</td>
                                                        <td className="align-middle">
                                                            <span className={clsx('badge', item.status === 1 ? 'badge-success-lighten' : 'badge-danger-lighten')}>{(item.status == 1 ? 'Đang hoạt động' : 'Khóa')}</span>
                                                        </td>
                                                        <td className=" text-center ">
                                                            <Dropdown className="d-inline mx-2">
                                                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                                                    <i className="text-light mdi mdi-dots-vertical font-18 text-primary"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item onClick={() => showModalEdit(item.id)}>Chỉnh sửa tài khoản</Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick={() => changePassword(item.id)} >Đặt lại mật khẩu</Dropdown.Item>
                                                                    <Dropdown.Divider />
                                                                    <Dropdown.Item onClick={() => toggleStatus(item.id, item.status, item.fullName)}>{item.status === 1 ? 'Khóa' : 'Mở khóa'}</Dropdown.Item>
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
            {/* <!--  Modal change pas --> */}
            <ResetPassword show={modalResetPassword} setModalFalse={setModalFalse} reloadTable={reloadTable} />

            {/* Modal tạo tài khoản */}
            <AddAccount show={modalAddAccount} setModalFalse={setModalFalse} reloadTable={reloadTable} />


            {/* Modal chỉnh sửa tài khoản */}
            <EditAccount show={modalEdit} infoUser={infoUser} setModalFalse={setModalFalse} reloadTable={reloadTable} />



        </>
    );
}

export default Account;