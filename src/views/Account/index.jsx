import React from 'react';
import PropTypes from 'prop-types';
import alertify from "alertifyjs";
import $ from 'jquery';
import * as utils from '../../utils/utils.js';
import { Alert } from 'bootstrap';
Account.propTypes = {

};

function Account(props) {
    const $imgAvatarAdd = $("#img-avatar-add");
    const $imgAvatarEdit = $("#img-avatar-edit");
    const $formEdit = $("#form-edit");

    initSelectRole();
    reloadTable();


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
        e.preventDefault();
        var user = utils.formToObject('#form-add');
        let error = null;
        if (utils.IsNullOrEmpty(user.FullName))
            error = "Họ tên không được để trông";
        else if (utils.IsNullOrEmpty(user.UserName))
            error = "Tên tài khoản không được để trống";
        else if (utils.IsNullOrEmpty(user.Password) || user.Password.length < 6)
            error = "Mật khẩu không được nhỏ hơn 6 kí tự";
        else if (utils.IsNullOrEmpty(user.RoleId))
            error = "Chưa chọn vị trí";
        if (error != null) {
            alertify.alert(error);
        } else {
            user.RoleId = parseInt(user.RoleId);
            user.Avatar = CURRENT_IMG_PATH;
            utils.ajaxPost('User', user,
                function (rs) {
                    if (rs.IsSuccess) {
                        $('#form-add')[0].reset();
                        $imgAvatarAdd.attr('src', '/images/default-image.png');
                        alertify.success("Thêm thành công")
                        utils.hideModal('#modal-add')
                        $('#form-add').trigger('reset');
                        CURRENT_IMG_PATH = null;
                        reloadTable();
                    } else {
                        alertify.error(rs.Message);
                    }
                }
            );
        }

    };

    /*Binding file edit  */
    function handleModalEditSubmit(e) {
        e.preventDefault();
        var user = utils.formToObject('#form-edit');
        let error = null;
        if (utils.IsNullOrEmpty(user.FullName))
            error = "Họ tên không được để trông";
        else if (utils.IsNullOrEmpty(user.UserName))
            error = "Tên tài khoản không được để trống";
        else if (utils.IsNullOrEmpty(user.RoleId))
            error = "Chưa chọn vị trí";
        if (error != null) {
            alertify.alert(error);
        } else {
            user.RoleId = parseInt(user.RoleId);
            user.Avatar = CURRENT_IMG_PATH;
            user.Id = CURRENT_USER_ID;
            utils.ajaxPut('User/' + CURRENT_USER_ID, user,
                function (rs) {
                    if (rs.IsSuccess) {
                        alertify.success("Cập nhật thành công")
                        CURRENT_IMG_PATH = null;
                        utils.hideModal('#modal-edit')
                        $('#form-edit').trigger('reset');
                        reloadTable();
                    } else {
                        alertify.error(rs.Message);
                    }
                }
            );
        }
    };


    /*Binding search */
    $('#ipt-text-search').on('keypress', function (e) {
        setTimeout(function () {
            var KEY_WORD = e.target.value;
            reloadTable();
        }, 200)
    });

    /*Binding change role */
    $('#sl-role').change(() => reloadTable());

    /*Binding change status */
    $('#sl-status').change(() => reloadTable());

    /*Binding search */
    $('#btn-delete').on('click', function (e) {
        alertify.confirm("Xác nhận xóa tài khoản", function () {
            utils.ajaxDelete('User/' + CURRENT_USER_ID, function (res) {
                if (res.IsSuccess) {
                    alertify.success("Xóa thành công")
                    reloadTable()
                    utils.hideModal('#modal-edit');
                }
                else alertify.error(res.Message);
            });
        });
    });

    /*FUNCTION*/

    /*Hiển thị modal edit*/
    function showModalEdit(id) {
        try {
            CURRENT_USER_ID = id;
            utils.ajaxGet('User/' + id, null, function (res) {
                if (res.IsSuccess) {
                    let data = res.Result;
                    CURRENT_IMG_PATH = utils.getImagePath(data.Avatar);
                    $formEdit.find('input[name="FullName"]').val(data.FullName);
                    $formEdit.find('input[name="Phone"]').val(data.Phone);
                    $formEdit.find('input[name="Email"]').val(data.Email);
                    $formEdit.find('input[name="UserName"]').val(data.UserName);
                    $formEdit.find('select[name="RoleId"]').val(data.RoleId);
                    $imgAvatarEdit.attr('src', utils.getImagePath(CURRENT_IMG_PATH));
                    utils.showModal('#modal-edit');

                } else {
                    alertify.error(res.Message);
                }
            });

        } catch (e) {
            alertify.error("Có lỗi xảy ra");
        }
        utils.showModal("#modal-edit");
    }

    /*Reload table*/
    function reloadTable() {
        utils.ajaxGet('User', {
            keyword: $('#ipt-text-search').val(),
            positionId: parseInt($('#sl-role').val() == undefined ? 0 : $('#sl-role').val()),
            statusId: parseInt($('#sl-status').val())
        }, res => {
            if (res.IsSuccess) {
                let data = res.Result;
                let html = data.map((item, i) => (
                    `<tr>
                                <td>${i + 1}</td>
                                <td className="table-user">
                                    <img src="${utils.getImagePath(item.Avatar)}" className="mr-2 rounded-circle">
                                        <a onClick={void(0)} className="text-body font-weight-semibold">${item.FullName}</a>
                                                </td>
                                    <td>${item.Phone}</td>
                                    <td>${item.Email}</td>
                                    <td>${item.UserName}</td>
                                    <td>${item.RoleName}</td>
                                    <td>
                                        <span className="badge badge-${(item.Status == 1 ? 'success' : 'danger')}-lighten">${(item.Status == 1 ? 'Đang hoạt động' : 'Khóa')}</span>
                                    </td>
                                    <td className="text-center px-w-50">
                                    <div className="dropdown">
                                        <a className="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown"><i className="mdi mdi-dots-vertical font-18 text-primary"></i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a onClick={()=>showModalEdit(${item.Id})} className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-window-restore mr-1"></i>Chi tiết</a>
                                            <a onClick={()=>changePassword(${item.Id})} className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-lock-reset mr-1"></i>Đặt lại mật khẩu</a>
                                            <a onClick={()=>toggleStatus(${item.Id},${item.Status},'${item.FullName}')} className="a-detail toggleActive(${item.Id, item.Status}) dropdown-item cursor-pointer"><i className="mdi ${item.Status == 1 ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'} mr-1"></i>${item.Status == 1 ? 'Khóa' : 'Mở khóa'}</a>
                                          </div>
                                    </div>
                            </tr>`
                ));
                $('#tbl-body').html(html);
            }
        });
    }

    function initSelectRole() {
        //initSelect({
        //    Element: "#sl-role",
        //    Url: "user/",
        //    Value: "Name",
        //    Id: "Id"
        //});
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
        utils.showModal('#modal-change-pass');
        $("#form-change-pass").trigger("reset");
        $('#modal-change-pass').find("#form-change-pass").unbind().on('submit', function (e) {
            e.preventDefault();
            let text = utils.formToObject("#form-change-pass").Password;
            if (utils.IsNullOrEmpty(text) || text.length < 6)
                alertify.error("Mật khẩu không được nhỏ hơn 6 kí tự");
            else {
                utils.ajaxPost('User/ResetPassword/' + id, {
                    NewPassword: text
                }, function (res) {
                    if (res.IsSuccess) {
                        alertify.alert("Đổi mật khẩu thành công")
                        utils.hideModal('#modal-change-pass');
                    }
                })
            }
        })
    }
    function toggleStatus(id, curentStatus, fullName) {
        let newSttName = curentStatus == 1 ? 'Khóa' : 'Mở khóa'
        alertify.confirm("Xác nhận " + newSttName + " tài khoản " + fullName, function () {

            let url = curentStatus == 1 ? "user/LockDownUser/" : "user/UnLockUser/";
            utils.ajaxPost(url + id, null, function (res) {
                if (res.IsSuccess) {
                    alertify.alert(newSttName + " tài khoản " + fullName + " thành công");
                    reloadTable();
                    utils.hideModal('#modal-change-pass');
                } else {
                    alertify.error(res.Message);
                }
            })
        })

    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <button onClick={() => utils.showModal('#modal-add')} type="button" className="btn btn-primary"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Thêm tài khoản</button>
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
                                    <button onClick={reloadTable()} type="button" className="btn btn-block btn-primary"><i className="mdi mdi-refresh font-16 mr-1"></i>Làm mới dữ liệu</button>
                                    {/* <!-- Search --> */}
                                    <div className="mt-4">
                                        <h5 className="text-primary">Tìm kiếm</h5>
                                        <div className="form-group">
                                            <input id="ipt-text-search" type="text" className="form-control" placeholder="Tìm tên tài khoản" autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="text-primary">Chức vụ</h5>
                                        <select className="form-control " id="sl-role">
                                            <option value="0"> Tất cả </option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="text-primary">Trạng thái</h5>
                                        <div className="form-group">
                                            <select className="form-control " id="sl-status">
                                                <option value="0"> Tất cả </option>
                                                <option value="1"> Đang hoạt động </option>
                                                <option value="2"> Đã khóa </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-aside-right">
                                    {/* <!-- Table --> */}
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover dt-responsive nowrap w-100" id="products-datatable">
                                            <thead>
                                                <tr>
                                                    <th className="stt">
                                                        #
                                                    </th>
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
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--  Modal change pas --> */}
            <div className="modal fade" id="modal-change-pass">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Đổi mật khẩu</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <form id="form-change-pass">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Mật khẩu mới <span className="text-danger"> &nbsp;* </span></label>
                                            <div className="input-group">
                                                <input type="text" name="Password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="btn-add" type="submit" className="btn btn-primary">Đổi mật khẩu</button>
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </form>
                    </div> {/* <!-- /.modal-content --> */}
                </div> {/* <!-- /.modal-dialog --> */}
            </div>{/* <!-- /.modal --> */}

            {/* Modal tạo tài khoản */}
            <div className="modal " id="modal-add">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myLargeModalLabel">Tạo tài khoản</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="form-add">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group text-center">
                                                    <img className="img-fluid cursor-pointer rounded-circle col-md-8" id="img-avatar-add" src="~/images/default-avatar.jpg" alt='img' />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group mb-3 ">
                                                    <label>
                                                        Họ tên
                                                        <span className="text-danger">&nbsp;*</span>
                                                    </label>
                                                    <input type="text" className="form-control" name="FullName" placeholder="Nguyễn Văn A" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Số điện thoại</label>
                                                    <input type="text" className="form-control" name="Phone" placeholder="xxxx-xxx-xxx " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="Email" placeholder="abc@gmail.com" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>
                                                    Chức vụ
                                                    <span className="text-danger">&nbsp;*</span>
                                                </label>
                                                <select className="select2 form-control " id="sl-role-add" name="RoleId" data-toggle="select2-no-search" data-placeholder="Chọn chức vụ ...">
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-md-6">
                                                <label>Tên tài khoản<span className="text-danger">&nbsp;*</span></label>
                                                <input type="text" className="form-control" name="UserName" placeholder="nguyenvana" />
                                            </div>
                                            <div className="form-group mb-3 col-md-6">
                                                <label>
                                                    Mật khẩu
                                                    <span className="text-danger">&nbsp;*</span>
                                                </label>
                                                <input type="text" className="form-control" name="Password" placeholder="********" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Đóng</button>
                            <button onClick={(e) => handleModalAddSubmit(e)} type="submit" className="btn btn-primary" type="submit">Thêm mới</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal chỉnh sửa tài khoản */}
            <div className="modal " id="modal-edit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myLargeModalLabel">Chỉnh sửa tài khoản</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="form-edit">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group text-center">
                                                    <img className="img-fluid cursor-pointer rounded-circle col-md-8" id="img-avatar-edit" src="/images/default-avatar.jpg" alt='img' />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group mb-3 ">
                                                    <label>Họ tên <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" name="FullName" placeholder="Nguyễn Văn A" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Số điện thoại</label>
                                                    <input type="text" className="form-control" name="Phone" placeholder="xxxx-xxx-xxx " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group  col-md-6">
                                                <label>Email</label>
                                                <input type="text" className="form-control" name="Email" placeholder="abc@gmail.com" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Chức vụ <span className="text-danger">*</span></label>
                                                <select className="select2 form-control " id="sl-role-edit" name="RoleId" data-placeholder="Chọn chức vụ ...">
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group mb-3 col-md-6">
                                                <label>Tên tài khoản <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" name="UserName" placeholder="nguyenvana" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btn-delete" type="button" className="btn btn-danger m-w-100 mr-auto ml-1"><i className="mdi mdi-trash-can mr-1"></i>Xoá</button>
                            <button type="button" className="btn btn-light m-w-100" data-dismiss="modal"><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
                            <button id="btn-edit-branch" onClick={(e) => handleModalEditSubmit(e)} type="submit" className="btn btn-primary ml-1"><i className="mdi mdi-check mr-1"></i>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Model thông tin tài khoản  */}
            <div className="modal" id="modal-profile">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myLargeModalLabel">Thông tin tài khoản</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="form-profile">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group text-center">
                                                    <img className="img-fluid cursor-pointer rounded-circle col-md-8" id="img-avatar-edit" src="/@Model.Avatar" alt='img' onError={(currentTarget) => { currentTarget.onerror = null; currentTarget.src = '/images/default-avatar.jpg' }} />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group mb-3 ">
                                                    <label>Họ tên</label>
                                                    <input type="text" value="@Model.FullName" readOnly className="form-control  bg-white" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Số điện thoại</label>
                                                    <input type="text" className="form-control bg-white" readOnly value="@Model.Phone" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group  col-md-6">
                                                <label>Email</label>
                                                <input type="text" className="form-control bg-white" readOnly value="@Model.Email" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Chức vụ</label>
                                                <input type="text" className="form-control bg-white" readOnly value="@Model.RoleName" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light m-w-100" data-dismiss="modal"><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Account;