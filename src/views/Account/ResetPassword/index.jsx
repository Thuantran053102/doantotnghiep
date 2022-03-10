import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";


ResetPassword.propTypes = {

};

function ResetPassword(props) {
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
                    <h4 className="modal-title">Đổi mật khẩu</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <button id="btn-add" type="submit" className="btn btn-primary"><i className="mdi mdi-check mr-1"></i>Đổi mật khẩu</button>
                <button type="button" className="btn btn-light " data-bs-dismiss="modal" onClick={() => {
                    // setShowModal(false);
                    setModalFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
            </Modal.Footer>
        </Modal >
    );
}

export default ResetPassword;