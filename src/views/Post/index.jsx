import { useEffect, useRef, useState } from "react"
import Style from "./Post.module.scss"
import { removeUnicode, changerangedate, getTowDayAgo, getDay, changeday } from '../../utils/utils'
import { FilterPost } from "../../utils/filterPost"
// import { getDateRangeValue } from "../../utils/utils"
import Select from "../../components/Select/Select"
import DateRangePicker from 'rsuite/DateRangePicker';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import 'rsuite/dist/rsuite-rtl.min.css'
import clsx from "clsx"
// import { data } from "jquery"
// import { Modal } from "bootstrap"
import { Link } from "react-router-dom"
import { actions } from "../../utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Buttom from "../../components/Buttom"

var APIPost = [
    {
        danhmuc: 'tin tức',
        tieude: 'cuộc sống này vốn bất lươn nên cuộc đời ta bất ổn ',
        nguouoisoan: 'trần văn thuận',
        ngaydang: '28/02/2022',
        trangthai: 'hiện'
    },
    {
        danhmuc: 'Khuyến mãi',
        tieude: 'bạn ơi đừng nghiện nữa đời mình còn gì đâu',
        nguouoisoan: 'trần văn thuận',
        ngaydang: '28/02/2022',
        trangthai: 'hiện'
    },
    {
        danhmuc: 'tư vấn',
        tieude: 'cuộc sống này vốn bất lươn nên cuộc đời ta bất ổn ',
        nguouoisoan: 'nguyễn hoàn sang',
        ngaydang: '28/02/2022',
        trangthai: 'ẩn'
    },
    {
        danhmuc: 'tin tức',
        tieude: 'cuộc sống mà đầy nổi đâu',
        nguouoisoan: 'trần văn thuận',
        ngaydang: '',
        trangthai: 'hiện'
    }
]


function Post() {
    //get datenow
    var today = new Date();
    var datea = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    // list chọn
    const categoryList = ['Tất cả', 'Tin tức', 'Khuyến mãi', 'Tư vấn', 'Tin tuyển dụng', 'Quy định và chính sách']

    // biến trung gian
    const presently = 'Ẩn', unPresently = 'Hiện'
    // let arraySearch=[]


    const textMutedRef = useRef()
    const downMenuRef = useRef()
    const textRef = useRef()
    const showRef = useRef()


    // const [arrPortSearch,setArrPortSearch] =useState([...APIPost])
    // const [arrcate,setArrcate] =useState([...APIPost])
    const [arrayPost, setArrayPost] = useState([...APIPost])

    const [testSearchValue, setTestSearchValue] = useState('')
    const [categoryValue, setCategoryValue] = useState(categoryList[0])
    const [dateValue, setDateValue] = useState(datea + ' - ' + datea)

    // useEffect
    useEffect(() => {
        setDateValue(document.getElementsByClassName('rs-picker-toggle-textbox')[0].value)
        FilterPost(APIPost, [arrayPost, setArrayPost], testSearchValue, categoryValue, dateValue)
    }, [dateValue])

    useEffect(() => {
        FilterPost(APIPost, [arrayPost, setArrayPost], testSearchValue, categoryValue, dateValue)
    }, [testSearchValue])





    // daterangpicker 
    const {
        allowedMaxDays,
        allowedDays,
        allowedRange,
        beforeToday,
        afterToday,
        combine
    } = DateRangePicker;

    const Ranges = [
        {
            label: 'Hôm nay',
            value: [startOfDay(new Date()), endOfDay(new Date())]
        },
        {
            label: 'Hôm qua',
            value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
        },
        {
            label: '7 ngày trước',
            value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
        },
        {
            label: '30 ngày trước',
            value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())]
        },
        {
            label: '1 năm trước',
            value: [startOfDay(subDays(new Date(), 364)), endOfDay(new Date())]
        },
    ];
    const Label = props => {
        return <label style={{ display: 'block', marginTop: 10 }} {...props} />;
    };


    // sự kiện (onClick)
    const loadTable = () => {

    }
    const lookTypePost = (id, trangthai) => {
        // thay đỏi trạng thái hiện ẩn
        const trangthaimoi = (removeUnicode(trangthai) === removeUnicode(unPresently)) ? presently : unPresently
        showRef.current.classList.add(Style.show)
        const content = showRef.current.getElementsByClassName(Style.description)
        content[0].innerText = 'xác nhận ' + trangthaimoi + ' sản phẩm '
        // click nút đồng ý 
        const btnAgree = showRef.current.getElementsByClassName('btn_pri')
        btnAgree[0].onclick = function () {
            console.log(btnAgree[0])
        }
    }
    const deletePost = (id) => {
        showRef.current.classList.add(Style.show)
        const content = showRef.current.getElementsByClassName(Style.description)
        content[0].innerText = 'bạn có chắc muốn xóa mục này'
        // click nút đồng ý 
        const btnAgree = showRef.current.getElementsByClassName('btn_pri')
        btnAgree[0].onclick = function () {
            console.log(btnAgree[0])
        }
    }
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <a href="/admin/post/add" type="button" className="btn btn-primary"><i className="mdi mdi-plus-circle font-16 mr-1"></i>Đăng tin mới</a>
                            </div>
                            <h4 className="page-title">Quản lý tin tức</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="page-aside-left p-0">
                                    <button onClick={loadTable()} type="button" className="btn btn-block btn-primary"><i className="mdi mdi-refresh font-16 mr-1"></i>Làm mới dữ liệu</button>
                                    <div className="mt-4">
                                        <h5 className="text-primary">Tìm kiếm</h5>
                                        <div className="form-group">
                                            <input id="ipt-text-search" type="text" className="form-control" value={testSearchValue} onChange={(e) => { setTestSearchValue(e.target.value) }} placeholder="Tìm tiêu đề tin tức..." autoComplete="off" />

                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <h5 className="text-primary">Danh mục</h5>
                                            <div className="form-group" style={{ position: "relative" }}>
                                                <input type="text" className="form-control " value={categoryValue} style={{ textAlign: 'start' }} />
                                                <Select array={categoryList} nameclass={['overflow-hide', 'zindex-post']} state={[categoryValue, setCategoryValue]} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mt-2">
                                        <h5 className="text-primary">Ngày đăng</h5>
                                        <div class="form-group" style={{ position: 'relative' }}>

                                            <DateRangePicker className={clsx(Style.rangeDate)}
                                                disabledDate={afterToday()}
                                                onChange={(value) => { setDateValue([value.select]) }}
                                                // onOk={value=>{setDateValue(value)}}
                                                ari
                                                format='dd/MM/yyyy'
                                                defaultValue={[new Date(), new Date()]}
                                                character=' - '
                                                ranges={Ranges}
                                                ref={textRef}
                                            >
                                            </DateRangePicker>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mt-2">
                                        <h5 className="text-primary">Số bài viết</h5>
                                        <div className="form-group">
                                            <select id="sel-record-search" className="form-control" data-toggle="select-no-search">
                                                <option value="20">20 bài viết</option>
                                                <option value="30">30 bài viết</option>
                                                <option value="50">50 bài viết</option>
                                                <option value="100">100 bài viết</option>
                                                <option value="200">200 bài viết</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-aside-right">
                                    <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                        <table className="table table-hover table-centered">
                                            <thead>
                                                <tr style={{ position: 'relative' }}>
                                                    <th className="text-center px-w-50">#</th>
                                                    <th>Danh mục</th>
                                                    <th>Tiêu đề</th>
                                                    <th>Người soạn</th>
                                                    <th>Ngày đăng</th>
                                                    <th>Trạng thái</th>
                                                    <th className="text-center px-w-50"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbl-body" >
                                                <tr className={clsx(Style.textMuted, 'text-muted')} ref={textMutedRef} >
                                                    <td colspan="7" className="text-center">
                                                        <div className="text-center text-muted pt-4 pb-4">
                                                            <p className="mb-0">
                                                                <i className="mdi mdi-48px mdi-folder-open-outline"> </i>
                                                            </p><p>Không tìm thấy dữ liệu
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {


                                                    arrayPost.map(function (item, index) {
                                                        const trangthai = (removeUnicode(item.trangthai) === removeUnicode(unPresently)) ? presently : unPresently
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-center">{index}</td>
                                                                <td>{item.danhmuc}</td>
                                                                <td>{item.tieude}</td>
                                                                <td>{item.nguouoisoan}</td>
                                                                <td>{item.ngaydang}</td>
                                                                <td><span className="badge badge-success-lighten">{item.trangthai}</span></td>
                                                                <td className="text-center px-w-50" >
                                                                    <div className={clsx(Style.dropdown, "dropdown")} style={{ top: '0' }}>
                                                                        <a className="dropdown-toggle text-muted arrow-none cursor-pointer" data-toggle="dropdown"><i className="mdi mdi-dots-vertical font-18 text-primary" ></i></a>
                                                                        <div className={clsx(Style.dropdown_menu, 'dropdown-menu dropdown-menu-right')} ref={downMenuRef}>
                                                                            <a href="/nhung-ly-do-ban-nen-ve-sinh-may-lanh-thuong-xuyen" target="_blank" className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-window-restore mr-1"></i>Xem chi tiết</a>
                                                                            <a href="/admin/post/edit/69" className="a-detail dropdown-item cursor-pointer"><i className="mdi mdi-export mr-1"></i>Cập nhật tin tức</a>
                                                                            <a onClick={() => { lookTypePost(item.id, item.trangthai) }} className="a-delete dropdown-item cursor-pointer"> <i className="mdi mdi-content-save-settings mr-1"></i>{trangthai} bài viết</a>
                                                                            <a onClick={() => { deletePost(item.id) }} className="a-delete dropdown-item cursor-pointer"><i className="mdi mdi-trash-can-outline mr-1"></i>Xóa tin</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        )


                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row">
                                        <div id="div-pagination-info" className="col-6 mt-2">
                                            đang xem

                                            <b> {arrayPost.length} </b> -

                                            <b> 1 </b>
                                            trong
                                            <b> {arrayPost.length} </b>
                                            bài viết
                                        </div>
                                        <div className="col-6"><div id="div-pagination-selection" className="float-right mb-3 mt-1"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* thông báo ẩn hiện tin  */}
                <div className={clsx(Style.modal)} ref={showRef} style={{ position: 'absolute', display: 'block' }}>
                    <div className={clsx(Style.announce)}>
                        <div className={clsx(Style.title)}>
                            <h5>Thông Báo</h5>
                            <span onClick={() => { actions.closeModal({ myref: showRef, myclass: Style.show }) }} ><FontAwesomeIcon icon={faXmark} /></span>
                        </div>
                        <div className={clsx(Style.description)}>
                        </div>
                        <div className={clsx(Style.footer)}>
                            <Buttom spanClass={['btn_pri']} iconClass={['mdi-check']} func={() => { }} content='đồng ý' />
                            <Buttom spanClass={['mr-2', 'ml-2']} iconClass={['mdi-cancel']} func={() => { actions.closeModal({ myref: showRef, myclass: Style.show }) }} content='hủy bỏ' />
                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}
export default Post