import clsx from "clsx";
import React, { memo, useEffect, useRef } from "react";
import './Select.scss'


{/* <Select array={unitList} nameclass={['a']} state={[unit, setUnit]} /> */}
// array : danh sách chọn
// nameclass : các class
function Select(props){
    const classRef= useRef()
    const {array , nameclass,state} =props
    const [item, setItem] =state
    useEffect(()=>{
        nameclass.forEach(element => {
           
            classRef.current.classList.add(element)
        })
    },[])
   
    return(
        <>
             <ul className={clsx('selectList')} ref={classRef}>
                {
                    array.map((item,index)=>
                        <li className={ clsx( 'insuranceItem selectItem')} key={index} onMouseOver={()=>{setItem(item)}}>{item}</li>
                    )
                }           
            </ul>
        </>
    )
}
export default memo(Select)