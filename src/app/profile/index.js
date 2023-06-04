import {memo} from "react"
import useTranslate from "../../hooks/use-translate"
import useSelector from "../../hooks/use-selector"
import PageLayout from "../../components/page-layout"
import User from "../../containers/user"
import Head from "../../components/head"
import LocaleSelect from "../../containers/locale-select"
import Navigation from "../../containers/navigation"
import ProfileCard from "../../components/profile-card"
import Spinner from "../../components/spinner"

  function Profile() {

    const select = useSelector(state => ({
      loggedIn: state.auth.loggedIn,
      profileData: state.profile.profileData,
      waiting: state.profile.waiting,
    }))

    const {t} = useTranslate();

    return (
      <PageLayout>
        <User/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard user={select.profileData} t={t}/>
        </Spinner>
      </PageLayout>
    );
  }

export default memo(Profile);