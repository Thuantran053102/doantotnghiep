import Style from "./Add.module.scss"
import { useState, useEffect } from 'react'
import { ArrowIcon,Example,Select } from "../../../components"
import default_img from "../../../assets/images/default_image.png"
import postApi from "../../../api/Post"
import {removeUnicode,MakeUrl }from'../../../utils/utils'
import { alertify } from "alertifyjs";
import $ from 'jquery'


function AddPost()
{
    alertify.alert().setting({
        'label': '<i class="mdi mdi-check mr-1"></i>Xác nhận',
        'title': 'Thông báo'
   });

   

    // biến tạm 
    const categoryList ={'Tin tức':2, 'Khuyến mãi':3, 'Tư vấn':4, 'Tin tuyển dụng':5, 'Quy định và chính sách':6}
    const statusList ={'Ẩn tin':0,'Hiện tin ngay':1}
    const imgFormat=['jpeg','gif','png','tiff','raw','psd','jpg']
  

    //
    const [imgPost,setImgPost]= useState('') 
    const [imgValue,setImgValue]=useState('')
    const [titleValue,setTitleValue]= useState('')
    const [pannerPath,setPannerPath]= useState('')
    const [linkValue,setLinkValue] = useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    const [categoryValue,setCategoryValue] =useState('')
    const [statusValue,setStatusValue]=useState('')
    const [noteValue,setNoteValue] =useState('')
    const [editorValue,setEditorValue]= useState('')

    // // index
    const [indexCategory,setIndexCategory]= useState(2)
    const [indexStatus,setIndexStatus]= useState(0)


    // xử lý add hình ảnh 
    const handlePreviewAvatar = async (e) => {
        const file = e.target.files[0];
        setImgValue(e.target.files[0])
        file.review = URL.createObjectURL(file)
        setImgPost(file)
    }

    useEffect(async()=>{
        if(imgPost!=='')
        {
            let resultimg= imgFormat.find(function(item){
                return removeUnicode((imgPost.name).slice((imgPost.name).lastIndexOf('.')+1))===removeUnicode(item)
            })
            if(resultimg)
            {
                let form = new FormData();
                form.append('files',imgValue);
                const response = await postApi.uploadImg(form);
                setPannerPath(response.data)
                if (response.isSuccess) {
                    localStorage.setItem('user-token', JSON.stringify(response.data))
                    
                }
                else {
                    alertify.alert('upload ảnh thất bại')
                }
            }
            else{
                alertify.alert('chỉ nhận file ảnh có đuôi là jpeg,gif,png,tiff,raw,psd')
                setImgPost('')
                setImgValue('')
            }
        }
    },[imgPost])
    // xử lý thêm tiêu đề
    useEffect(()=>{
        setTimeout(()=>{
              setLinkValue( MakeUrl(titleValue))
        },250)
    },[titleValue])

    useEffect(()=>{
        setIndexCategory(categoryList[categoryValue])
      },[categoryValue])

    useEffect(()=>{
        setIndexStatus(statusList[statusValue])
      },[statusValue])

    const createPost =async () => {
        try {
            const data = { "bannerPath": pannerPath,
                            "title": titleValue,
                            "friendlyUrl": linkValue,
                            "shortDescription": descriptionValue,
                            "categoryId": indexCategory,
                            "status": indexStatus,
                            "note": noteValue,
                            "content": editorValue,
                            "thumbNailImage": "string"
                                }
            const response = await postApi.add(data);
            console.log('aa',data);
            if (response.isSuccess) {
                localStorage.setItem('user-token', JSON.stringify(response.data))
                console.log('jjjjj',response)
            }
            else {
                alertify.alert('u')
            }

        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title-right">
                                <a href="/admin/post" class="btn btn-primary"><i class="mdi mdi-arrow-left font-16 mr-1"></i>Trở về trang tin tức</a>
                            </div>
                            <h4 class="page-title">Đăng tin mới</h4>
                        </div>
                    </div>

                    <div class="col-md-3">
                    <div class="card sticky-top">
                        <div class="card-body">
                                <img src="/images/logo-icon-trans.png" height="16" width="16" />
                               
                                {/* <span id="preview-url"></span>
                                <h3 class="font-weight-normal font-20"><a href="#" id="preview-title"></a></h3> 
                                <p id="preview-desc"></p> */}
                        </div>
                    </div>
                    </div>
                    <div class="col-md-7">
                        <form id="form-add">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="header-title mb-4">HÌNH ĐẠI DIỆN <span class="h6 text-danger">* (318 x 154)</span></h4>
                                            <div class="row">
                                                <div class="col-md-12 container-image">
                                                    <img id="img-banner" src={imgPost.review ? imgPost.review : default_img} class="img-auto-size" style={{maxHeight:'400px'}} onerror="this.src='/images/default-banner.jpg'" />
                                                </div>
                                                <div class="col-md-12 mt-2">
                                                    <button className=" btn btn-primary form-control m-w-100 mt-1" type="button" id="btn-thumbnail-product" style={{ position: "relative" }}>
                                                        <span style={{ position: "absolute", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                                                        <input type="file" onChange={handlePreviewAvatar} style={{ opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                                    </button>
                                                    {/* <button id="btn-banner" type="button" class="btn btn-primary btn-sm float-right"><i class="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button> */}
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
                                                        <input name="Title" value={titleValue} onChange={(e)=>{setTitleValue(e.target.value)}} type="text" class="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Đường dẫn tin</label>
                                                        <span class="text-danger"> * Lưu ý: Đường đẫn tin chỉ bao gồm chữ cái, số và những kí tự gạch ngang "-" và kí tự gạch chân "_". </span>
                                                        <input id="FiendlyUrl" value={linkValue} onChange={e=>{setLinkValue(e.target.value)}} name="FiendlyUrl" type="text" class="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Mô tả ngắn (Description SEO)</label>
                                                        <textarea type="text" value={descriptionValue} onChange={e=>{setDescriptionValue(e.target.value)}} name="Description" class="form-control" placeholder="" rows="10"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group" >
                                                        <label>Danh mục <span class="text-danger">*</span></label>
                                                        <div style={{position:'relative'}}> 
                                                            <input type="text" value={categoryValue} onChange={(e) => {setCategoryValue(e.target.value) }} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder="" />
                                                            <ArrowIcon />
                                                            <Select array={Object.keys(categoryList)} nameclass={['categoryList', 'inputList', 'ulList','overflow-hide']} state={[categoryValue,setCategoryValue]}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Trạng thái <span class="text-danger">*</span></label>
                                                        <div style={{position:'relative'}}> 
                                                            <input type="text" value={statusValue} onChange={(e) => { setStatusValue(e.target.value) }} name="CategoryId" id="slCategory" className="select2 form-control select2-multiple" placeholder="" />
                                                            <ArrowIcon />
                                                            <Select array={Object.keys(statusList)} nameclass={['categoryList', 'inputList', 'ulList','overflow-hide']} state={[statusValue,setStatusValue]} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Ghi chú</label>
                                                        <input name="Note" value={noteValue} onChange={e=>{setNoteValue(e.target.value)}} type="text" class="form-control" placeholder="" />
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
                                                <Example myState={[editorValue,setEditorValue]}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button onClick={()=>{createPost()}} type="button" id="btn-save" class="btn btn-primary float-right"><i class="mdi mdi-check-bold font-16 mr-1"></i>Tạo bài viết</button>
                                </div>
                                <div id="div-add-img" style={{visibility:'hidden'}} class="col-md-12">
                                    <button  id="test-upload" type="button" class="btn btn-primary btn-sm float-right"><i class="mdi mdi-plus-circle font-16 mr-1"></i>Thêm hình ảnh</button>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="col-md-2">

                    </div>
                </div>
            </div>
        </>
    )
}
export default AddPost