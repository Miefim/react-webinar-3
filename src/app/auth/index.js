import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import useTranslate from "../../hooks/use-translate"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import Navigation from "../../containers/navigation"
import Spinner from "../../components/spinner"
import AuthCard from "../../components/auth-card"
import LocaleSelect from "../../containers/locale-select"
import User from '../../containers/user'

function Auth() {

   const store = useStore();
   const navigate = useNavigate()
   
   const select = useSelector(state => ({
      userData: state.user.userData,
      token: state.user.token,
      waiting: state.user.waiting,
      err: state.user.signInError
   }))

   useEffect(() => {
      if(select.userData){
         localStorage.setItem('token', select.token)
         navigate('/profile', {replace: true})
      }
   }, [select.userData])
   
   const callbacks = {
      signIn: useCallback((log, pas) => store.actions.user.signIn(log, pas), [store]),
   }
   
   const {t} = useTranslate();
   
   return (
      <PageLayout>
         <User/>
         <Head title={t('title')}>
            <LocaleSelect/>
         </Head>
         <Navigation/>
         <Spinner active={select.waiting}>
            <AuthCard signIn={callbacks.signIn} serverErr={select.err} t={t}/>
         </Spinner>
      </PageLayout>
   )
}

export default memo(Auth)
