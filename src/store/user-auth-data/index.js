import StoreModule from "../module";
import {errorMessageHandler} from "../../utils";

class UserAuthDataState extends StoreModule {

   initState() {
      return { 
         loggedIn: false,
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
         
         const json = await response.json()
         
         if(!response.ok && json){
            this.setState({
               ...this.getState(),
               signInError: errorMessageHandler(json.error.data.issues),
               waiting: false,
            }, `Запись ошибки`) 
            return
         }
         
         this.setState({
            ...this.getState(),
            loggedIn: true,
            token: json.result.token,
            waiting: false,
         }, `Запись данных авторизации`)

      } catch (error) {
        
         this.setState({
            ...this.getState(),
            signInError: 'Непредвиденная ошибка',
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

         this.resetUserAuthDataState()

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Запись ошибки`)

      }
   }

   setUserAuthDataParams(newParams) {
      this.setState({
         ...this.getState(),
         ...newParams
      }, `Запись параметров авторизации`)
   }

   resetUserAuthDataState() {
      this.setState({
         ...this.initState(),
      }, `Сброс стейта авторизцаии`)
   }
}

export default UserAuthDataState;