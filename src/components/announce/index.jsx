import { actions } from "../../utils"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import Buttom from "../Buttom"
import { useRef } from "react"
import Style from './announce.module.scss'
import clsx from "clsx"
function Announce(content){

    const showRef = useRef()
    // showRef.current.classList.add(myclass)
    return(
        <div className={clsx(Style.modal)}  ref= {showRef} style={{position:'absolute',display:'block'}}>
            <div className={clsx(Style.announce)}>
                <div className={clsx(Style.title)}>
                    <h5>Thông Báo</h5>
                    <span onClick={()=>{actions.closeModal({myref:showRef,myclass:Style.show})}} ><FontAwesomeIcon icon={faXmark} /></span>
                </div>
                <div className={clsx(Style.description)}>
                
                </div>
                <div className={clsx(Style.footer)}>
                        <Buttom spanClass={['btn_pri']} iconClass={['mdi-check']} func={()=>{actions.closeModal(showRef)}} content='đồng ý'/>
                        <Buttom spanClass={['mr-2','ml-2']} iconClass={['mdi-cancel']} func={()=>{actions.closeModal({myref:showRef,myclass:Style.show})}} content='hủy bỏ'/>
                </div>
            </div>
        </div>
    )
}
export default Announce