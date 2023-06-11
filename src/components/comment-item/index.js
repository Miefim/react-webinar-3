import {memo, useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"
import dateFormatting from "../../utils/date-formatting"
import "./style.css"

function CommentItem({ item, userId, children, t, onActivation, shift }) {

  const commentRef = useRef()
  const [isCollapsed, setIsCollapsed] = useState(null)
  
  useEffect(() => {
    if(commentRef.current?.clientHeight >= 196){
      setIsCollapsed(true)
    }
  },[commentRef])

  if(item.isDeleted){
    return(
      <div className='CommentItem__deleted' style={{marginLeft: shift}}>
        {t('commentItem.deletedCommentMessage')}
      </div>
    )
  }
  else{
    return (
      <>
        <div className='CommentItem' style={{marginLeft: shift}}>
          <div className='CommentItem-header'>
            <h5 className={`header-name ${item.author._id === userId && 'name__author'}`}>{item.author.profile.name}</h5>
            <div className='header-date'>{dateFormatting(item.dateCreate)}</div>
          </div>
          <div className={`CommentItem-body ${isCollapsed === false && 'CommentItem-body__active'}`} ref={commentRef}>
            {item.text} 
          </div>
          <div className='CommentItem-footer'>
            <button className='footer-replyButton' onClick={() => onActivation(item)}>{t('commentItem.reply')}</button>
            {
              isCollapsed !== null && 
              <button className='footer-replyButton' onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? t('commentItem.moreButton') : t('commentItem.hiddenButton')}
              </button>
            }
          </div>
        </div>
        {children}
      </>
    )
  }
}

CommentItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    _type: PropTypes.string,
    isDeleted: PropTypes.bool,
    parent: PropTypes.shape({
      _id: PropTypes.string,
      _type: PropTypes.string,
    }),
    dateUpdate: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string
      }),
      _id: PropTypes.string
    }),
    _id: PropTypes.string
  }).isRequired,
  userId: PropTypes.string,
  shift: PropTypes.number,
  children: PropTypes.node,
  t: PropTypes.func,
  onActivation: PropTypes.func,
}

CommentItem.defaultProps = {
  onActivation: () => {},
  t: (text) => text
}

export default memo(CommentItem)