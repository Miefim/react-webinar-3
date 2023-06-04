import {memo, useCallback, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import useTranslate from "../../hooks/use-translate"
import useStore from "../../hooks/use-store"
import useInit from "../../hooks/use-init"
import useSelector from "../../hooks/use-selector"
import UserBar from "../../components/user-bar"
import Spinner from '../../components/spinner';

function User() {

   const store = useStore()
   const navigate = useNavigate()

   const select = useSelector(state => ({
      userName: state.profile.profileData?.profile.name,
      token: state.auth.token,
      waiting: state.profile.waiting
   }))
 
   const callbacks = {
      logOut: useCallback(async() => {
         await store.actions.auth.logOut(select.token)
         store.actions.profile.resetUserProfileDataState()
         localStorage.removeItem('token')
      }, [store, select.token]),
      onSignIn: useCallback(() => navigate('/login'), [])
   }

   const {t} = useTranslate();

   return (
      <Spinner active={select.waiting}>
         <UserBar 
            profileLink='/profile'
            userName={select.userName} 
            onLogOut={callbacks.logOut} 
            onSignIn={callbacks.onSignIn} 
            t={t}
         />
      </Spinner>
   )
}

export default memo(User);