import {memo, useState} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import "./style.css"

function CommentArea({ signInLink, isAuth, t, onSend, placeholder='' }) {

   const [message, setMessage] = useState('')

   if(isAuth) {
      return (
         <div className='CommentArea'>
            <h5 className='CommentArea-title'>{t('commentArea.title')}</h5>
            <textarea 
               className='CommentArea-area' 
               type='text' 
               onChange={(e) => setMessage(e.target.value)}
               value={message}
               placeholder={placeholder}
            />
            <button onClick={() => onSend(message)}>{t('commentArea.sendButton')}</button>
         </div>
      )
   }
   else {
      return (
         <div className='CommentArea'>
            <Link to={signInLink} className='CommentArea-link'>{t('commentArea.signInLink')}</Link>{t('commentArea.signInMessage')}
         </div>   
      )
   }
}

CommentArea.propTypes = {
   signInLink: PropTypes.string,
   isAuth: PropTypes.bool,
   t: PropTypes.func,
   onSend: PropTypes.func
}

CommentArea.defaultProps = {
   t: (text) => text,
   onSend: () => {}
}

export default memo(CommentArea)