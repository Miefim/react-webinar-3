import {memo} from "react"
import PropTypes from "prop-types"
import "./style.css"

function PageTools({children}) {
   return(
      <div className='Page-tools'>
         {children}
      </div>
   )
}

PageTools.propTypes = {
   children: PropTypes.node
}

export default memo(PageTools)