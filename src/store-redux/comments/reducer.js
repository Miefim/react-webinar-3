const initialState = {
  comments: [],
  count: 0,
  activeComment: null,
  waiting: false,
  error: null,
  sendMessageError: null
}
 
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], count: 0, activeComment: null, waiting: true, error: null };
  
    case "comments/load-success":
      return { ...state, comments: action.payload.comments.items, count: action.payload.comments.count, waiting: false };
  
    case "comments/load-error":
      return { ...state, comments: [], count: 0, activeComment: null, waiting: false, error: action.payload }; //@todo текст ошибки сохранить?

    
    
    case "comments/sendMessage-start":
      return { ...state, waiting: true, sendMessageError: null };
  
    case "comments/sendMessage-success":
      return { ...state, waiting: false };
  
    case "comments/sendMessage-error":
      return { ...state, waiting: false, sendMessageError: action.payload }
    
    
    
    case "comments/setActiveComment":
      return { ...state, activeComment: action.payload }
  
    default:
      // Нет изменений
      return state;
  }
}
 
export default reducer;