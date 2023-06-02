import StoreModule from "../module";

class UserState extends StoreModule {

   initState() {
      return {
         userData: null, 
         token: null,
         waiting: false,
         signInError: null,
         error: null
      }
   }

   async signIn(login, password){
      try {

         const authData = {
            login: login,
            password: password
         }
         
         this.setState({
            ...this.getState(),
            waiting: true,
            signInError: null
         }, `Изменение статуса загрузки`)

         const response = await fetch('/api/v1/users/sign', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)  
         })

         if(!response.ok){
            throw new Error(`${response.status === 400 ? 'Неверный логин/пароль' : 'Ошибка сервера'}`) 
         }

         const json = await response.json()

         this.setState({
            ...this.getState(),
            userData: json.result.user,
            token: json.result.token,
            waiting: false,
         }, `Запись данных юзера`)

      } catch (error) {
        
         this.setState({
            ...this.getState(),
            signInError: error.message,
            waiting: false,
         }, `Запись ошибки`)

      }  
   }

   async logOut(token){
      try {

         this.setState({
            ...this.getState(),
            waiting: true,
            error: null
         }, `Изменение статуса загрузки`)

         await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            }  
         })

         this.setState({
            ...this.getState(),
            userData: null,
            token: null,
            waiting: false,
         }, `Запись данных юзера`)

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Запись ошибки`)

      }
   }

   async getUserData(token) {
      try {

         this.setState({
            ...this.getState(),
            waiting: true,
            error: null
         }, `Изменение статуса загрузки`)

         const response = await fetch('/api/v1/users/self', {
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            } 
         })
         const json = await response.json() 

         this.setState({
            ...this.getState(),
            userData: json.result,
            waiting: false,
         }, `Запись данных юзера`)

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Запись ошибки`)

      }
   }

   setToken(token) {
      this.setState({
         ...this.getState(),
         token: token
      }, `Запись токена`)
   }

   resetUserState() {
      this.setState({
         ...this.initState(),
      }, `Сброс стейта пользователя`)
   }
}

export default UserState;