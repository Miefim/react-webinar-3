import {memo} from "react"
import PropTypes from "prop-types"
import {translator} from "../../utils"
import "./style.css"

function Loader({language}) {
   return(
      <div className='Loader'>{translator('Loading', language)}</div>
   )
}

Loader.propTypes = {
   language: PropTypes.string,
}

export default memo(Loader)