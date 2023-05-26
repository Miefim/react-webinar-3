import StoreModule from "../module"

class Details extends StoreModule {

  initState() {
      return {
         id: null,
         title: null,
         description: null,
         madeIn: null,
         price: null,
         category: null,
         edition: null,
         isLoading: false, 
         error: null
      }
   }

   async getDetails(id) {
      try {

         this.setState({
            ...this.getState(),
            isLoading: true,
            error: null,
         }, 'Изменение статуса загрузки')

         const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`)
         const json = await response.json()

         this.setState({
            ...this.getState(),
            id: json.result._id,
            title: json.result.title,
            description: json.result.description,
            price: json.result.price,
            madeIn: json.result.madeIn.title,
            category: json.result.category.title,
            edition: json.result.edition,
            isLoading: false,
         }, 'Загружены данные товара по id')

      } catch (error) {

         this.setState({
            ...this.getState(),
            error: 'Ошибка сервера (',
            isLoading: false,
         }, 'Изменение статуса ошибки')

      }
   }
}

export default Details