import React, {memo, useCallback, useMemo} from "react"
import {useDispatch, useSelector as useSelectorRedux} from "react-redux"
import {useParams, useNavigate, useLocation} from "react-router-dom"
import useSelector from "../../hooks/use-selector"
import useTranslate from "../../hooks/use-translate"
import shallowequal from "shallowequal"
import CommentsCard from "../../components/comments-card"
import List from "../../components/list"
import CommentItem from "../../components/comment-item"
import Spinner from "../../components/spinner"
import commentsAction from "../../store-redux/comments/actions"
import listToTree from "../../utils/list-to-tree"
import treeToList from "../../utils/tree-to-list"
import ReplyArea from "../../components/reply-area"
import CommentArea from "../../components/comment-area"

function CommentsList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const {t} = useTranslate()

  const select = useSelector(state => ({
    isAuth: state.session.exists,
    userId: state.session.user?._id
  }))

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    activeComment: state.comments.activeComment,
    waiting: state.comments.waiting,
    error: state.comments.error,
    sendMessageError: state.comments.sendMessageError
  }), shallowequal)

  const renderList = useMemo(() => 
    treeToList(
      listToTree(selectRedux.comments, params.id), 
      (item, level) => ({...item, level}
    )
  ), [selectRedux.comments]) 

  const renders = {
    item: useCallback(item => (
      <CommentItem 
        item={item} 
        userId={select.userId}
        t={t} 
        onActivation={callbacks.onActivationComment} 
      >
      {
        selectRedux.activeComment?._id === item._id && 
        <ReplyArea 
          t={t} 
          onResetActivation={callbacks.onActivationComment} 
          signIn={callbacks.onSignIn}
          isAuth={select.isAuth}
          onReply={callbacks.onSendMessage}
          placeholder={t('textArea.placeholder')}
        />
      }   
      </CommentItem>
    ), [selectRedux.activeComment, select.isAuth, t]),
  }
  
  const callbacks = {
    onActivationComment: useCallback(activeComment => dispatch(commentsAction.setActiveComment(activeComment)), []),
    onSendMessage: useCallback(message => {
      const type = selectRedux.activeComment ? selectRedux.activeComment._type : 'article'
      const parentId = selectRedux.activeComment ? selectRedux.activeComment._id : params.id
      dispatch(commentsAction.sendMessage(message, type, parentId))
    },[selectRedux.activeComment]),
    onSignIn: useCallback(() => navigate('/login', {state: {back: location.pathname}}), [location.pathname]), 
  }

  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsCard t={t} totalComments={selectRedux.count}>
        {
          !selectRedux.error
          ?
            <List
              list={renderList}
              renderItem={renders.item} 
              borderNone={true}
            />
          :
            <div>Ошибка сервера</div>
        }
        {
          !selectRedux.activeComment &&
          <CommentArea 
            t={t}
            isAuth={select.isAuth}
            signIn={callbacks.onSignIn}
            onSend={callbacks.onSendMessage}
            placeholder={t('textArea.placeholder')}
          />
        }
      </CommentsCard>
    </Spinner>
  )
}

export default memo(CommentsList)