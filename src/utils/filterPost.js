
import {removeUnicode , SumDate} from './utils'
import { Searchfilter } from './search'
import { ListFilter } from './filterList'
import { unique } from './unique'

export function FilterPost(APIPost,coppyArrayAPI,startInput,catevalue){
    let array=[]
    const [start,setStart]= coppyArrayAPI
    const tieude='tieude'
    const danhmuc='danhmuc'
    let searchArray= Searchfilter(APIPost,startInput,tieude)
    let listArray= ListFilter(APIPost,catevalue,danhmuc)
    searchArray.map(function(item,index){
        listArray.map(function(item2,index){
                if(item===item2){
                    array=[...array,item]
                }
        })
    })
    console.log('kk',catevalue)
    return setStart([...array])
   
}