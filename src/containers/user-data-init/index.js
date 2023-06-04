import {memo, useEffect} from "react"
import useStore from "../../hooks/use-store"
import useInit from "../../hooks/use-init"
import useSelector from "../../hooks/use-selector"

function UserDataInit({children}) {

   const store = useStore()

   useInit(() => {
      const token = localStorage.getItem('token')
      store.actions.auth.setUserAuthDataParams({token})
   }, []);

   const select = useSelector(state => ({
      profileData: state.profile.profileData,
      token: state.auth.token,
      loggedIn: state.auth.loggedIn,
      waiting: state.profile.waiting
   }))

   useEffect(() => {
      if(select.token && !select.profileData){
         store.actions.profile.getProfileData(select.token)
         localStorage.setItem('token', select.token)
      }
   }, [select.token])

   useEffect(() => {
      if(select.profileData){
         store.actions.auth.setUserAuthDataParams({loggedIn: true})
      }
   }, [select.profileData])

   return (
      <>{children}</>
   )
}

export default memo(UserDataInit);