// import {removeUnicode} from './utils'
// // hàm lọc item theo 
// // lỗi chưa dùng 
// export function filter(APIPort,coppyArrayAPI,startInput){
    
//     let array =[]
//     const [start,setStart]= coppyArrayAPI
//     const [stateInput,setStateInput]=  startInput
    
//     if(removeUnicode(stateInput)===(removeUnicode('tất cả')))
//     {
//         array=[...APIPort]
//     }
//     else{
//         APIPort.map(function(item,index){
//             if(removeUnicode(item.danhmuc)===removeUnicode(stateInput))
//             {
//                 array=[...array,item]
//             }
//         })
//     }
    
//     return setStart([...array])
   
// }