import StoreModule from "../module";

class ArticleState extends StoreModule {

   initState() {
      return {
         categories: null,
         waiting: false,
      }
   }

   async getCategories() {
      this.setState({
         ...this.getState(),
         waiting: true
      }, 'Изменение статуса загрузки');

      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`)
      const json = await response.json()
   
      this.setState({
         ...this.getState(),
         categories: json,
         waiting: false
      }, 'Загружен список категорий');
   }
  
}

export default ArticleState;
