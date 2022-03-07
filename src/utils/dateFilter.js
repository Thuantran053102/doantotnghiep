import { SumDate } from "./utils"
export function DateFilter(APIArray,startInput,ngaydang){
    let array=[]
    const stateInput=  startInput
    const property=ngaydang
    let sumItemdate=''
    let dateStart=''
    let dateEnd=''
    let date=''
    APIArray.map(function(itemcate,index) {
        date=itemcate[property]
        sumItemdate=SumDate(date)
        dateStart =SumDate(stateInput.slice(0,stateInput.indexOf(' - ')))
        dateEnd=SumDate(stateInput.slice(stateInput.indexOf(' - ')+3))
        if(dateStart<=sumItemdate && sumItemdate<=dateEnd)
        {
            array=[...array,itemcate]
        }
    })
   
    return array
}