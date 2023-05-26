import StoreModule from "../module"

class Language extends StoreModule {

  initState() {
      return {
         language: 'RUS'
      }
   }

   change(language){
      this.setState({language: language}, `Изменение языка на ${language}`)
   }

}

export default Language