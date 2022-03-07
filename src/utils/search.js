export function Searchfilter(APIArray,startInput,tieude)
{
    let array=[]
    const stateInput=startInput
    const property=tieude
    if(stateInput.length<=0)
    {
        array=[...APIArray]
    }
    else{
        APIArray.map(function(item,index){
            if(removeUnicode(item[property]).includes(removeUnicode(stateInput)))
            {
                array=[...array,item]
            }
        })
    }
    return array
}