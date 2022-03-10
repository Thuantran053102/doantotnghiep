import Style from './edit.module.scss'
import Example from '../../../components/Editor'
import { useState, useEffect } from 'react'
function  Edit(){

    const [editorValue,setEditorValue]= useState('')

    return(
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <a href="/admin/post" class="btn btn-primary"><i class="mdi mdi-arrow-left font-16 mr-1"></i>Trở về trang tin tức</a>
                            </div>
                            <h4 class="page-title">Cập nhật tin đăng </h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        {/* <div class="card sticky-top">
                            <div class="card-body">
                                <img src="/images/logo-icon-trans.png" height="16" width="16" />
                                <span id="preview-url"></span>
                                <h3 class="font-weight-normal font-20"><a href="#" id="preview-title"></a></h3>
                                <p id="preview-desc"></p>
                            </div>
                        </div> */}
                    </div>
                    <div class="col-md-7">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-4">Hình đại diện <span class="h6 text-danger">(318 X 154)</span></h4>
                                        <div class="row">
                                            <div class="col-md-12 container-image">
                                                <img id="img-banner" src="/images/default-banner.jpg" class="img-auto-size" onerror="this.src='/images/default-banner.jpg'" />
                                            </div>
                                            <div class="col-md-12 mt-2">
                                                <button id="btn-banner" type="button" class="btn btn-primary btn-sm float-right"><i class="mdi mdi-plus-circle font-16 mr-1"></i>Thay đổi hình ảnh</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-4">Thông tin</h4>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Tiêu đề <span class="text-danger">*</span></label>
                                                    <input id="ipt-edit-post-title" name="Title" type="text" class="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <span class="text-danger mt-2"> * Lưu ý: Đường đẫn tin chỉ bao gồm chữ cái, số và những kí tự gạch ngang "-" và kí tự gạch chân "_". </span>
                                                    <br /><label>Đường dẫn tin</label>
                                                    <input id="ipt-edit-post-friendly-url" name="FiendlyUrl" type="text" class="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Mô tả ngắn (Description SEO)</label>
                                                    <textarea id="textarea-edit-post-sub-title" name="Description" type="text" class="form-control" placeholder="" rows="10"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Danh mục <span class="text-danger">*</span></label>
                                                    <select id="sel-edit-post-category" class="form-control" data-toggle="select"></select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Trạng thái <span class="text-danger">*</span></label>
                                                    <select id="sel-edit-post-type" class="form-control" data-toggle="select-no-search">
                                                        <option value="1">Ẩn tin</option>
                                                        <option value="2">Hiển thị ngay</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Ghi chú</label>
                                                    <input id="ipt-edit-post-note" type="text" class="form-control" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-4">Nội dung <span class="text-danger">*</span></h4>
                                        <div class="row">
                                            <div class="col-md-12">
                                                {/* <textarea id="editor"></textarea> */}
                                                <Example myState={[editorValue,setEditorValue]}/>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button onclick="UpdatePost()" type="button" class="btn btn-primary float-right"><i class="mdi mdi-check-bold font-16 mr-1"></i>Cập nhật bài viết</button>
                            </div>
                            <div id="div-add-img" style={{ visibility: 'hidden' }} class="col-md-12">
                                <button id="test-upload" type="button" class="btn btn-primary btn-sm float-right"><i class="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                      
                        {/* <div class="card sticky-top">
                            <div class="card-body">
                                <label>Từ khóa</label>
                                <input id="ipt-keyword-seo" class="form-control" />
                            </div>
                            <div class="card-body">
                                <p id="count_keyword_seo"></p>
                                <p id="length_meta_desc"></p>
                                <p id="length_desc"></p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div id="div-add-img d-none">
                <button id="btn-add-img" style={{ opacity: 0 }}></button>
            </div>
           
        </>
    )
}
export default Edit