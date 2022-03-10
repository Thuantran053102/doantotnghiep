import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faCaretUp} from '@fortawesome/free-solid-svg-icons'

import style from './ArrowIcon.scss'
function Arrow(){
    return(
        <>
            <span className="iconbrands" style={{position:"absolute",right:"10px", top:"50%", transform:"translateY(-50%)"}}>
                <i className="icondown"> <FontAwesomeIcon icon={faCaretDown} /></i> 
                <i className="iconup"> <FontAwesomeIcon icon={faCaretUp} /></i> 
            </span> 
        </>
        )
}
export default Arrow