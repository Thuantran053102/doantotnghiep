
import {removeUnicode , SumDate} from './utils'
import { Searchfilter } from './search'
import { ListFilter } from './listFilter'
import { DateFilter } from './dateFilter'
import { unique } from './unique'

export function FilterPost(APIPost,coppyArrayAPI,startInput,catevalue,dateValue){
    let array=[]
    const [start,setStart]= coppyArrayAPI
    console.log('startInput',startInput)
    const tieude='tieude'
    const danhmuc='danhmuc'
    const ngaydang='ngaydang'
    let searchArray= Searchfilter(APIPost,startInput,tieude)
    let listArray= ListFilter(APIPost,catevalue,danhmuc)
    let dateArray= DateFilter(APIPost,dateValue,ngaydang)
    searchArray.map(function(item,index){
        listArray.map(function(item2,index){
            dateArray.map(function(item3,index){
                if(item===item2 && item2===item3 && item3===item){
                    array=[...array,item]
                }
            })
        })
    })
    return setStart([...array])
   
}