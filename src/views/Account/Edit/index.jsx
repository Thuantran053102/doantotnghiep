import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from "react";
import userApi from '../../../api/User'

EditAccount.propTypes = {

};

function EditAccount(props) {
    const { show, infoUser, setModalEditFalse } = props;
    // console.log('modal:', infoUser)
    const [roleValue, setRoleValue] = useState('0');
    const [roleSelect, setRoleSelect] = useState([])
    const [userData, setUserData] = useState({
        fullName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        role: '',
        avatar: '',
        userId: '',
    })

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const responseRole = await userApi.getRoles()
                setRoleSelect(responseRole.data)
                // console.log(roleSelect)
            }
            catch (e) {
                console.error(e)
            }
        }
        getAllUsers()
        setUserData(infoUser)

    }, [infoUser])

    // console.log('userdata:', userData)

    const [showModal, setShowModal] = useState(show)

    // Hiển thị Modal
    useEffect(() => {
        setShowModal(show)
    }, [show])

    // Gọi API lấy dữ liệu user
    // useEffect(() => {
    //     const getInfoUser = async () => {
    //         try {
    //             const response = await userApi.get(userId)
    //             setInfoUser(response.data)
    //             console.log(response.data)
    //         }
    //         catch (e) {
    //             console.error(e)
    //         }
    //     }
    //     getInfoUser()
    // }, [userId])
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
                                        <img className="img-fluid cursor-pointer rounded-circle col-md-8" id="img-avatar-edit" src="/images/default-avatar.jpg" alt='img' />
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
                                    {/* <Select array={['Tất cả', 'Admin', 'Intem']} nameclass={['select2 form-control']} state={[unit, setUnit]} />/> */}
                                    <select className="form-control " id="sl-role" onChange={(e) => setRoleValue(e.target.value)} value={roleValue}>
                                        <option value='0'> Tất cả </option>
                                        {
                                            roleSelect.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>
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
                <button id="btn-delete" type="button" className="btn btn-danger m-w-100 mr-auto ml-1"><i className="mdi mdi-trash-can mr-1"></i>Xoá</button>
                <button type="button" className="btn btn-light m-w-100" data-dismiss="modal" onClick={() => {
                    setShowModal(false);
                    setModalEditFalse();
                }}><i className="mdi mdi-block-helper mr-1"></i>Đóng</button>
                <button id="btn-edit-branch" type="submit" className="btn btn-primary ml-1"><i className="mdi mdi-check mr-1"></i>Cập nhật</button>
            </Modal.Footer>
        </Modal >

    );
}
// onClick={(e) => handleModalEditSubmit(e)}
export default EditAccount;