import {memo} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {translator} from "../../utils"
import "./style.css"

function Navigate({language='RUS'}) {
   return(
      <nav className='Navigate'>
         <Link to='/'><div className='Navigate-item'>{translator('NavMain', language)}</div></Link>
      </nav>
   )
}

Navigate.propTypes = {
   language: PropTypes.string,
}

export default memo(Navigate)