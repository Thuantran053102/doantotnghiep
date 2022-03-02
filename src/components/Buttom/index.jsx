import clsx from 'clsx'
import { memo, useEffect, useRef } from 'react'
import './Buttom.scss'


 function Buttom(props){
    const spanRef=useRef()
    const iconRef= useRef()
    const {spanClass,iconClass,func, content,...sy} = props
    useEffect(()=>{
        spanClass.forEach(element => {
            spanRef.current.classList.add(element)
        });
        iconClass.forEach(element=>{
            iconRef.current.classList.add(element)
        })
    },[])
    return(
        
        <span className={clsx('btn btns')} ref={spanRef} onClick={func}>
             <i className={clsx("mdi  font-20 mr-1")} ref={iconRef} ></i>{content}
        </span>
    )
}
export default memo(Buttom)