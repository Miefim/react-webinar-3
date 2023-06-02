import {memo, useCallback} from "react"
import {useNavigate} from "react-router-dom"
import useTranslate from "../../hooks/use-translate"
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import UserBar from "../../components/user-bar"
import Spinner from '../../components/spinner';

function User() {

   const store = useStore()
   const navigate = useNavigate()

   const select = useSelector(state => ({
      userName: state.user.userData?.profile.name,
      token: state.user.token,
      waiting: state.user.waiting
   }))
 
   const callbacks = {
      logOut: useCallback(async() => {
         await store.actions.user.logOut(select.token)
         store.actions.user.resetUserState()
         localStorage.removeItem('token')
      }, [store, select.token]),
   }

   const {t} = useTranslate();

   return (
      <Spinner active={select.waiting}>
         <UserBar 
            profileLink='/profile'
            userName={select.userName} 
            onLogOut={callbacks.logOut} 
            onSignIn={() => navigate('/auth')} 
            t={t}
         />
      </Spinner>
   )
}

export default memo(User);