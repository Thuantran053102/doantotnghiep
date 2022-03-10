
import {removeUnicode} from './utils'

export function ListFilter(APIArray,startInput,danhmuc){
    let array=[]
    const stateInput=  startInput
    const property=danhmuc
    if(removeUnicode(stateInput)===removeUnicode('Tất cả'))
    {
        array=[...APIArray]
    }
    else{
    
        APIArray.map(function(item,index){
            if(removeUnicode(item[property])==(removeUnicode(stateInput)))
            {
                array=[...array,item]
            }
        })
    }
    return array
}