import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";
import userApi from '../../../api/User'
import postApi from '../../../api/Post';
import alertify from "alertifyjs";
import { removeUnicode } from '../../../utils/utils'

import default_img from "../../../assets/images/default_image.png"
import * as utils from "../../../utils/utils"

AddAccount.propTypes = {

};

function AddAccount(props) {
    const { show, setModalFalse, reloadTable } = props;
    const [showModal, setShowModal] = useState(show)
    const [roleSelect, setRoleSelect] = useState([])

    const [userData, setUserData] = useState({
        fullName: "",
        phoneNumber: "",
        avartarPath: "",
        userName: "",
        password: "",
        email: "",
        role: "Admin"
    })

    // Hiển thị Modal
    useEffect(() => {
        (async function () {
            try {
                const responseRole = await userApi.getRoles()
                setRoleSelect(responseRole.data)
            }
            catch (e) {
                console.error(e)
            }
        })()
        setShowModal(show)

    }, [show])

    const imgFormat = ['jpeg', 'gif', 'png', 'tiff', 'raw', 'psd', 'jpg']
    const [imgPost, setImgPost] = useState('')

    // Gọi API upload ảnh
    const uploadImage = async (e) => {
        try {
            // Upload ảnh
            const file = e.target.files[0];
            file.review = URL.createObjectURL(file)
            setImgPost(file)

            if (file !== '') {
                let resultimg = imgFormat.find(function (item) {
                    return removeUnicode((file.name).slice((file.name).lastIndexOf('.') + 1)) === removeUnicode(item)
                })
                if (resultimg) {
                    let form = new FormData();
                    form.append('files', file);
                    const response = await userApi.uploadImg(form);
                    console.log('res data:', response.data)
                    if (response.isSuccess) {
                        setUserData({ ...userData, avartarPath: response.data })
                    }
                    else {
                        alertify.alert('Upload ảnh thất bại')
                    }
                }
                else {
                    alertify.alert('Chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                    setImgPost('')
                }
            }
        }
        catch (e) {
            console.error(e)
        }
        return false;
    }

    // Gọi API tạo tài khoản
    const createNewAccount = async () => {
        try {
            let error = null;
            if (utils.IsNullOrEmpty(userData.fullName))
                error = "Họ tên không được để trông";
            else if (utils.IsNullOrEmpty(userData.userName))
                error = "Tên tài khoản không được để trống";
            else if (utils.IsNullOrEmpty(userData.password) || userData.password.length < 6)
                error = "Mật khẩu không được nhỏ hơn 6 kí tự";
            else if (utils.IsNullOrEmpty(userData.role))
                error = "Chưa chọn vị trí";
            else if (utils.IsNullOrEmpty(userData.avartarPath))
                error = "Chưa chọn hình ảnh";
            if (error != null) {
                alertify.alert(error);
            } else {
                const response = await userApi.register(userData)
                if (response.isSuccess) {
                    alertify.success('Đăng ký tài khoản thành công.')
                    reloadTable()
                    setModalFalse()
                    setUserData({
                        fullName: "",
                        phoneNumber: "",
                        avartarPath: "",
                        userName: "",
                        password: "",
                        email: "",
                        role: "Admin"
                    })
                } else {
                    alertify.error(response.message)
                }
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal
            show={showModal}
            // onHide={() => setShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    <h4 className="modal-title" id="myLargeModalLabel">Tạo tài khoản</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-12">
                        <form id="form-add">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group text-center">
                                        <img className="position-relative img-fluid cursor-pointer col-md-8" id="img-avatar-add" src={imgPost.review ? imgPost.review : default_img} alt='img' />
                                        <input type="file" className="position-absolute" style={{ opacity: "0", width: '100%', height: "100%", cursor: "pointer", top: 0, left: 0 }} onChange={(e) => uploadImage(e)} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group mb-3 ">
                                        <label>
                                            Họ tên
                                            <span className="text-danger">&nbsp;*</span>
                                        </label>
                                        <input type="text" className="form-control" name="FullName" placeholder="Nguyễn Văn A" value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Số điện thoại</label>
                                        <input type="text" className="form-control" name="Phone" placeholder="xxxx-xxx-xxx " value={userData.phoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="text" className="form-control" name="Email" placeholder="abc@gmail.com" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>
                                        Chức vụ
                                        <span className="text-danger">&nbsp;*</span>
                                    </label>
                                    <select className="select2 form-control " id="sl-role-add" name="RoleId" data-toggle="select2-no-search" data-placeholder="Chọn chức vụ ..." value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} >
                                        {
                                            roleSelect.map((item, index) => (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                    <label>Tên tài khoản<span className="text-danger">&nbsp;*</span></label>
                                    <input type="text" className="form-control" name="UserName" placeholder="nguyenvana" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                    <label>
                                        Mật khẩu
                                        <span className="text-danger">&nbsp;*</span>
                                    </label>
                                    <input type="password" className="form-control" name="Password" placeholder="********" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" type="button" onClick={() => createNewAccount()}><i className="mdi mdi-check mr-1"></i>Thêm mới</button>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => {
                    // setShowModal(false);
                    setModalFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
            </Modal.Footer>
        </Modal >

    );
}

export default AddAccount;