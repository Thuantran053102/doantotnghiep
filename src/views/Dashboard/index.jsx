import React from "react"
import 'react-bootstrap';
import clsx from 'clsx';

import style from "./Dashboard.scss"
function Dashboard(){
 
    return(
      <div className="container mt-3" >
        <div className="row">
            helo
            <button id="btn-file" style={{opacity:0}}>GET FILE</button> 
            <div className="col-xl-12 col-lg-12">
                <h4 className="page-title mb-4">Thông kê số lượng đơn đặt hàng</h4>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick='handle'>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."> <i className="mdi mdi-file-star-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Đơn đặt hàng</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-order">0</span> <small> đơn</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick='handle'>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-alert-decagram widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Đơn đặt hàng chưa xử lý</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-pending-order">0</span> <small> đơn</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick='handle'>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."> <i className="mdi mdi-credit-card-multiple-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Tổng chương trình khuyến mãi</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-promotion">0</span><small> chương trình</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick='handle'>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-archive-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Tổng số sản phẩm</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-total-product">0</span> <small> sản phẩm</small></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card widget-flat cursor-pointer" onClick='handle'>
                            <div className="card-body">
                                <div className="float-right">
                                    <a href="."><i className="mdi mdi-archive-outline widget-icon"></i></a>
                                </div>
                                <h5 className="font-weight-normal mt-0">Số lượng mã trùng</h5>
                                <h3 className="mt-3 mb-3"><span id="sp-duplicate-code">0</span> <small> sản phẩm</small></h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 bg-white" id="div-duplicate">
                        <h5>Danh sách sản phẩm trùng mã </h5>
                        <table className="table table-striped table-centered mb-0">
                            <thead>
                                <tr>
                                    <th className="font-weight-bold">#</th>
                                    <th>Mã sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody id="tbl-duplicate-code">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 mt-3">
                <div className="row">
                    <div className="col-md-9">
                        <h4 className="page-title mb-1">Biều đồ thống kê số lượng đơn đặt hàng</h4>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <select id="slt-chart-range" className="form-control float-right" data-toggle="select-no-search">
                                <option value="1">Tuần này</option>
                                <option value="2">Tháng này</option>
                                <option value="3">Năm nay</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div id="order-chart" className="apex-charts" data-colors="#727cf5,#e3eaef"></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-12 col-lg-12 mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="page-title mb-1">Top sản phẩm được quan tâm nhất</h4>
                    </div>
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="btn-product" className="table table-hover table-centered">
                                <thead>
                                    <tr className={clsx(style.textCenter)}>
                                        <tr className={clsx(style.textCenter_right)}>
                                            <th className="text-center px-w-50">#</th>
                                            <th>Mã sản phẩm</th>
                                            <th >Tên sản phẩm</th>
                                        </tr>
                                        <tr className={clsx(style.textCenter_left)}>

                                        <th className="">Danh mục</th>
                                        <th className="">Thương hiệu</th>
                                        <th>Xuất xứ</th>
                                        <th>Tình trạng</th>
                                        <th className="money">Giá niêm yết</th>
                                        <th className="money">Giá bán lẻ</th>
                                        <th className="">Lượt truy cập</th>
                                        </tr>
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
    )
}

export default Dashboard