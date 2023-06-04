import { Outlet, Navigate } from "react-router-dom"
import {memo} from "react"
import PropTypes from "prop-types"

const PrivateRoute = ({condition, redirect}) => {
   return condition ? <Outlet/> : <Navigate to={redirect}/>
}

PrivateRoute.propTypes = {
   condition: PropTypes.bool,
   redirect: PropTypes.string
}

export default memo(PrivateRoute)