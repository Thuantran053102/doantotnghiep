import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";
import userApi from '../../../api/User'
import alertify from "alertifyjs";

ResetPassword.propTypes = {

};

function ResetPassword(props) {
    const { show, userId, setModalFalse, reloadTable } = props;

    const [showModal, setShowModal] = useState(show)
    const [newPassword, setNewPassword] = useState('')

    // Hiển thị Modal
    useEffect(() => {
        setShowModal(show)
    }, [show])

    // Xử lý reset password
    function handleResetPassword() {
        (
            async function () {
                try {
                    const response = await userApi.resetPassword(userId, newPassword)
                    if (response.isSuccess) {
                        setNewPassword('')

                        alertify.success("Đổi mật khẩu thành công")
                    } else {
                        alertify.error("Đổi mật khẩu thất bại")
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        )()
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
                    <h4 className="modal-title">Đổi mật khẩu</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group mb-3">
                            <label>Mật khẩu mới <span className="text-danger"> &nbsp;* </span></label>
                            <div className="input-group">
                                <input type="text" name="Password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button id="btn-add" type="submit" className="btn btn-primary" onClick={() => {
                    handleResetPassword()
                    setModalFalse();
                }}><i className="mdi mdi-check mr-1"></i>Đổi mật khẩu</button>
                <button type="button" className="btn btn-light " data-bs-dismiss="modal" onClick={() => {
                    setModalFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
            </Modal.Footer>
        </Modal >
    );
}

export default ResetPassword;