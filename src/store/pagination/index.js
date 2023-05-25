import StoreModule from "../module";

class Pagination extends StoreModule {

   initState() {
      return {
         page: 1
      }
   }

   setPage(page){
      this.setState({page}, `Изменение страницы ${page}`);
   }

}

export default Pagination;
