import {memo, useState} from "react"
import PropTypes from "prop-types"
import "./style.css"

function CommentArea({ signIn, isAuth, t, onSend, placeholder='' }) {

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
      <div className='CommentAreaMessage'>
        <div className='CommentAreaMessage-link' onClick={signIn}>{t('commentArea.signInLink')}</div>{t('commentArea.signInMessage')}
      </div>   
    )
  }
}

CommentArea.propTypes = {
  signIn: PropTypes.func,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
  onSend: PropTypes.func
}

CommentArea.defaultProps = {
  t: (text) => text,
  onSend: () => {}
}

export default memo(CommentArea)