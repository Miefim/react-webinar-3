import {memo} from "react"
import {Link} from "react-router-dom"
import "./style.css"

function Navigate() {
   return(
      <nav className='Navigate'>
         <Link to='/'><div className='Navigate-item'>Главная</div></Link>
      </nav>
   )
}

export default memo(Navigate)