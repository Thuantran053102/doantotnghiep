import { memo, useCallback } from "react"



export const closeModal = props =>{
    const {myref ,myclass,...syn} =props
    myref.current.classList.remove(myclass)
  
}



