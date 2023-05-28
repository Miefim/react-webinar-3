import {memo} from "react"
import PropTypes from "prop-types"
import {translator} from "../../utils"
import "./style.css"

function Error({language}) {
   return(
      <div className='Error'>{translator('ErrorServer', language)}</div>
   )
}

Error.propTypes = {
   language: PropTypes.string,
}

export default memo(Error)