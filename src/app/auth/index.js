import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store"
import useSelector from "../../hooks/use-selector"
import useTranslate from "../../hooks/use-translate"
import useInit from "../../hooks/use-init"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import Navigation from "../../containers/navigation"
import Spinner from "../../components/spinner"
import AuthCard from "../../components/auth-card"
import LocaleSelect from "../../containers/locale-select"
import User from '../../containers/user'

function Auth() {

   const store = useStore()

   useInit(() => store.actions.auth.setUserAuthDataParams({signInError: null}), [])

   const select = useSelector(state => ({
      loggedIn: state.auth.loggedIn,
      authWaiting: state.auth.waiting,
      profileWaiting: state.profile.waiting,
      err: state.auth.signInError
   }))
   
   const callbacks = {
      signIn: useCallback((log, pas) => store.actions.auth.signIn(log, pas), [store]),
   }
   
   const {t} = useTranslate();
   
   return (
      <PageLayout>
         <User/>
         <Head title={t('title')}>
            <LocaleSelect/>
         </Head>
         <Navigation/>
         <Spinner active={select.authWaiting || select.profileWaiting}>
            <AuthCard signIn={callbacks.signIn} serverErr={select.err} t={t}/>
         </Spinner>
      </PageLayout>
   )
}

export default memo(Auth)
