import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";


AddAccount.propTypes = {

};

function AddAccount(props) {
    const { show, setModalFalse } = props;

    const [showModal, setShowModal] = useState(show)
    // Hiển thị Modal
    useEffect(() => {
        setShowModal(show)
    }, [show])
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
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" type="submit"><i className="mdi mdi-check mr-1"></i>Thêm mới</button>
                <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => {
                    // setShowModal(false);
                    setModalFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
            </Modal.Footer>
        </Modal >

    );
}

export default AddAccount;