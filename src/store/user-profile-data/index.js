import StoreModule from "../module";

class UserProfileDataState extends StoreModule {

   initState() {
      return {
         profileData: null, 
         waiting: false,
         error: null
      }
   }

   async getProfileData(token) {
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
            profileData: json.result,
            waiting: false,
         }, `Запись данных профиля`)

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: error,
            waiting: false,
         }, `Запись ошибки`)

      }
   }

   setUserProfileDataParams(newParams) {
      this.setState({
         ...this.getState(),
         ...newParams
      }, `Запись параметров профиля`)
   }

   resetUserProfileDataState() {
      this.setState({
         ...this.initState(),
      }, `Сброс стейта профиля`)
   }
}

export default UserProfileDataState;