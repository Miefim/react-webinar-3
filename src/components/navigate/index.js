import {memo} from "react"
import {useNavigate} from "react-router-dom"
import PropTypes from "prop-types"
import {translator} from "../../utils"
import "./style.css"

function Navigate({language='RUS', setCatalogPage}) {
   
   const navigate = useNavigate()
   const mainClickHandler = async() => {
      await setCatalogPage(1)
      navigate('/')
   }

   return(
      <nav className='Navigate'>
         <div className='Navigate-item' onClick={mainClickHandler}>
            {translator('NavMain', language)}
         </div>
      </nav>
   )

}

Navigate.propTypes = {
   language: PropTypes.string,
   setPage: PropTypes.func
}

Navigate.defaultProps = {
   setPage: () => {},
}

export default memo(Navigate)