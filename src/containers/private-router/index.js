import {Navigate, useLocation} from "react-router-dom"
import {memo} from "react"
import useSelector from "../../hooks/use-selector"
import PropTypes from "prop-types"

const PrivateRoute = ({children}) => {

   const loggedIn = useSelector(state => state.auth.loggedIn)
   const location = useLocation()

   if(location.pathname === '/login'){
      return !loggedIn ? children : <Navigate to='/profile'/>
   }
   else {
      return loggedIn ? children : <Navigate to='/login'/>
   }
}

PrivateRoute.propTypes = {
   children: PropTypes.node.isRequired
}

export default memo(PrivateRoute)