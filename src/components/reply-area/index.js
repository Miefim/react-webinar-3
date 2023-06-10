import {memo, useState} from "react"
import PropTypes from "prop-types"
import "./style.css"

function ReplyArea({ isAuth, signIn, t, onReply, onResetActivation, placeholder='' }) {

  const [reply, setReply] = useState('')

  if(isAuth) {
    return (
      <div className='ReplyArea'>
        <h5 className='ReplyArea-title'>{t('replyArea.title')}</h5>
        <textarea 
          className='ReplyArea-area' 
          type='text' 
          onChange={(e) => setReply(e.target.value)}
          value={reply}
          placeholder={placeholder}
        />
        <button 
          className='ReplyArea-replyButton' 
          onClick={() => onReply(reply)}
        >
          {t('replyArea.replyButton')}
        </button>
        <button onClick={() => onResetActivation(null)}>{t('replyArea.cancelButton')}</button>
      </div>
    )
  }
  else {
    return (
      <div className='ReplyAreaMessage'>
        <div className='ReplyAreaMessage-link' onClick={signIn}>
          {t('replyArea.signInLink')}
        </div>
        {t('replyArea.signInMessage')}
        <button 
          className='ReplyArea-cancelButton' 
          onClick={() => onResetActivation(null)}
        >
          {t('replyArea.cancelButton')}
        </button>
      </div>   
    )
  }
}

ReplyArea.propTypes = {
  isAuth: PropTypes.bool,
  signIn: PropTypes.func,
  t: PropTypes.func,
  onReply: PropTypes.func,
  onResetActivation: PropTypes.func
}

ReplyArea.defaultProps = {
  t: (text) => text,
  onReply: () => {},
  onResetActivation: () => {}
}

export default memo(ReplyArea)