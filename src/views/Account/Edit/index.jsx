import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";
import userApi from '../../../api/User'
import { memo } from 'react'
import alertify from "alertifyjs";
EditAccount.propTypes = {

};

function EditAccount(props) {
    const { show, infoUser, setModalFalse, reloadTable } = props;
    const [roleValue, setRoleValue] = useState();
    const [roleSelect, setRoleSelect] = useState([])
    const [userData, setUserData] = useState(
        {
            userId: "",
            fullName: "",
            userName: "",
            phoneNumber: "",
            avatarPath: '',
            role: '',
            email: ''
        }
    )
    const [showModal, setShowModal] = useState(show)

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
        setUserData({
            userId: infoUser.userId,
            fullName: infoUser.fullName,
            userName: infoUser.userName,
            phoneNumber: infoUser.phoneNumber,
            avatarPath: infoUser.avatar,
            role: infoUser.role,
            email: infoUser.email
        })
    }, [infoUser])

    // Hiển thị Modal
    useEffect(() => {
        setShowModal(show)
    }, [show])

    // Xử lý update user
    function handleUpdateUser() {
        (
            async function () {
                try {
                    const response = await userApi.update(userData)
                    if (response.isSuccess) {
                        alertify.success("Cập nhật thành công")
                        reloadTable()
                    } else {
                        alertify.error("Cập nhật thất bại")
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )()
    }

    // Xử lý xóa user
    function handleDeleteUser(id, fullName) {
        alertify.confirm(`Bạn có chắc chắn muốn xóa tài khoản ' ${fullName} '`,
            function () {
                (async function () {
                    try {
                        const response = await userApi.delete(id)
                        if (response.isSuccess) {
                            alertify.success("Xóa tài khoản thành công")
                            reloadTable()
                            setModalFalse()
                        } else {
                            alertify.error("Xóa tài khoản thất bại")
                            setModalFalse()
                        }
                    }
                    catch (e) {
                        console.error(e)
                    }
                })()
            }
        )
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
                    <h4 className="modal-title" id="myLargeModalLabel">Chỉnh sửa tài khoản</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-12">
                        <form id="form-edit">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group text-center">
                                        <img className="img-fluid  col-md-8" id="img-avatar-edit" src={userData.avatarPath !== '' ? process.env.REACT_APP_API_URL + userData.avatarPath : "/images/default-avatar.jpg"} alt='img' />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group mb-3 ">
                                        <label>Họ tên <span className="text-danger"></span></label>
                                        <input type="text" className="form-control" name="FullName" placeholder="Nguyễn Văn A" value={userData.fullName || ''} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Số điện thoại</label>
                                        <input type="text" className="form-control" name="Phone" placeholder="xxxx-xxx-xxx " value={userData.phoneNumber || ''} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group  col-md-6">
                                    <label>Email</label>
                                    <input type="text" className="form-control" name="Email" placeholder="abc@gmail.com" value={userData.email || ''} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Chức vụ <span className="text-danger">*</span></label>
                                    <select className="form-control " id="sl-role" value={userData.role || ''} onChange={(e) => setUserData({ ...userData, role: e.target.value })} >
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
                                    <label>Tên tài khoản <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="UserName" placeholder="nguyenvana" value={userData.userName || ''} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button id="btn-delete" type="button" className="btn btn-danger m-w-100 mr-auto ml-1" onClick={() => handleDeleteUser(userData.userId, userData.fullName)}><i className="mdi mdi-trash-can mr-1"></i>Xoá</button>
                <button id="btn-edit-branch" type="submit" className="btn btn-primary ml-1" onClick={() => {
                    handleUpdateUser(userData);
                    setModalFalse()
                }}>
                    <i className="mdi mdi-check mr-1" ></i>Cập nhật
                </button>
                <button type="button" className="btn btn-light m-w-100" data-dismiss="modal" onClick={() => {
                    setModalFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
            </Modal.Footer>
        </Modal >
    );
}
export default EditAccount;