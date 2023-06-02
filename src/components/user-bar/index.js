import {memo} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './style.css';

function UserBar({userName, profileLink = '/', onSignIn, onLogOut, t}) {
   if(userName){
      return(
         <div className='UserBar'>
            <Link to={profileLink}><div className='UserBar-userName'>{userName}</div></Link>
            <button onClick={() => onLogOut()}>{t('logOut')}</button>
         </div>
      )
   }
   else{
      return(
         <div className='UserBar'>
            <button onClick={() => onSignIn()}>{t('signIn')}</button>
         </div>
      )
   }
}

UserBar.propTypes = {
   userName: PropTypes.string,
   profileLink: PropTypes.string,
   onSignIn: PropTypes.func,
   onLogOut:  PropTypes.func
};

UserBar.defaultProps = {
   onSignIn: () => {},
   onLogOut: () => {}
}

export default memo(UserBar);