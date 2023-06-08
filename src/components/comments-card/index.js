import {memo} from "react"
import PropTypes from "prop-types"
import "./style.css"

function CommentsCard({ totalComments, children, t }) {
   return (
      <div className='CommentsCard'>
         <h2 className='CommentsCard-title'>{t('commentsCard.title')} ({totalComments})</h2>
         {children}
      </div>
   )
}

CommentsCard.propTypes = {
   totalComments: PropTypes.number,
   children: PropTypes.node,
   t: PropTypes.func,
   onSend: PropTypes.func
}

CommentsCard.defaultProps = {
   t: (text) => text,
   onSend: () => {}
}

export default memo(CommentsCard)