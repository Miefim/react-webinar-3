import StoreModule from "../module";
import {errorMessageHandler} from "../../utils";

class UserAuthDataState extends StoreModule {

   initState() {
      return { 
         loggedIn: false,
         authData: null,
         token: null,
         waiting: false,
         signInError: null,
         error: null
      }
   }

   async getAuthData(tokenArg) {

      const token = tokenArg ? tokenArg : localStorage.getItem('token')

      if(!token){
         return
      }

      try {

         this.setState({
            ...this.getState(),
            waiting: true,
            error: null
         }, `Изменение статуса загрузки`)

         const response = await fetch('/api/v1/users/self?fields=_id,username,profile(name)', {
            headers: {
               'Content-Type': 'application/json',
               'X-Token': token
            } 
         })
         const json = await response.json() 

         this.setState({
            ...this.getState(),
            loggedIn: true,
            authData: json.result,
            token: token,
            waiting: false,
         }, `Запись данных авторизации`)

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Запись ошибки`)

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
            authData: {
               _id: json.result.user._id,
               username: json.result.user.username,
               profile: {
                  name: json.result.user.profile.name
               }
            },
            token: json.result.token,
            waiting: false,
         }, `Запись данных авторизации`)

         localStorage.setItem('token', json.result.token)

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
         
         localStorage.removeItem('token')

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