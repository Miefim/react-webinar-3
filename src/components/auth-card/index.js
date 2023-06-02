import {memo, useState} from "react";
import PropTypes from 'prop-types';
import Input from "../input";
import {loginValidator, passwordValidator} from "../../utils";
import './style.css';

function AuthCard({serverErr, signIn, t}) {
   
   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')
   const [loginErr, setLoginErr] = useState('')
   const [passwordErr, setPasswordErr] = useState('')

   const loginHandler = (login) => {
      setLogin(login)
      setLoginErr(loginValidator(login))
   }

   const passwordHandler = (password) => {
      setPassword(password)
      setPasswordErr(passwordValidator(password))
   }

   const signInHundler = () => {
      const loginErr = loginValidator(login)
      const passwordErr = passwordValidator(password)
      if(!loginErr && !passwordErr){
         signIn(login, password)
      }
      else{
         setLoginErr(loginErr)
         setPasswordErr(passwordErr)
      }
   }

   return (
      <div className='AuthCard'>
         <h2>{t('signIn')}</h2>
         <div className='AuthCard-inputName'>{t('login')}</div>
         <Input onChange={loginHandler} value={login}/>
         {
            loginErr 
            && <div className='AuthCard-validErr'>{loginErr}</div>
         }
         <div className='AuthCard-inputName'>{t('password')}</div>
         <Input onChange={passwordHandler} value={password} type='password'/>
         {
            passwordErr 
            && <div className='AuthCard-validErr'>{passwordErr}</div>
         }
         <br/>
         {
            serverErr 
            && <div className='AuthCard-serverErr'>
                  {serverErr}
               </div>
         }
         <button 
            className='AuthCard-signInButton' 
            onClick={signInHundler} 
            disabled={loginErr || passwordErr}
         >
            {t('authCard.signInButton')}
         </button>
      </div>
   );
}

AuthCard.propTypes = {
   serverErr: PropTypes.string,
   signIn: PropTypes.func,
   t: PropTypes.func
};

AuthCard.defaultProps = {
   signIn: () => {},
   t: (text) => text
}

export default memo(AuthCard);