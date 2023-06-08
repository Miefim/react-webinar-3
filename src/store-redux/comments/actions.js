export default {

   load: (id) => {
     return async (dispatch, getState, services) => {

      dispatch({type: 'comments/load-start'})

      try {
         const res = await services.api.request({
            url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_type,text,isDeleted,parent,dateUpdate,dateCreate,author(profile(name))),count`
         })

         dispatch({type: 'comments/load-success', payload: {comments: res.data.result}})

      } catch (e) {

         dispatch({type: 'comments/load-error'})
      }
     }
   },

   setActiveComment: (activeComment) => {
      
      return {type: 'comments/setActiveComment', payload: activeComment}
     
   },

   sendMessage: (text, type, parentId) => {
      return async (dispatch, getState, services) => {

      const data = {
         text: text,
         parent: {
            _id: parentId,
            _type: type
         }
      }

      const jsonData = JSON.stringify(data)
 
      dispatch({type: 'comments/sendMessage-start'})
 
         try {
            const res = await services.api.request({
               url: `/api/v1/comments?lang=ru`,
               method: "POST",
               body: jsonData
            })
   
            dispatch({type: 'comments/sendMessage-success', payload: {comments: res.data.result}})
 
         } catch (e) {

            dispatch({type: 'comments/sendMessage-error'})

         } 
      }
    },

}