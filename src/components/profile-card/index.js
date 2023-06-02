import {memo} from "react"
import PropTypes from 'prop-types'
import './style.css';

function ProfileCard({user, t}) {
   return (
      <div className='ProfileCard'>
         <h2 className='ProfileCard-title'>{t('profile')}</h2>
         <div className='ProfileCard-item'>
            {`${t('name')}: `}
            <b>{user?.profile.name}</b>
         </div>
         <div className='ProfileCard-item'>
            {`${t('phone')}: `}
            <b>{user?.profile.phone}</b>
         </div>
         <div className='ProfileCard-item'>
            {'email: '}
            <b>{user?.email}</b>
         </div>
      </div>
   );
}

ProfileCard.propTypes = {
   user: PropTypes.shape({
      email: PropTypes.string,
      profile: PropTypes.shape({
         phone: PropTypes.string,
         name: PropTypes.string 
      })
   }),
   t: PropTypes.func
};

ProfileCard.defaultProps = {
   t: (text) => text
}

export default memo(ProfileCard)