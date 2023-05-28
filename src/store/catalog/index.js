import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      total: null,
      page: 1,
      limit: 10,
      isLoading: false, 
      error: null
    }
  }

  async load(page = 1, limit = 10) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
        error: null,
      }, 'Изменение статуса загрузки');

      const response = await fetch(`api/v1/articles?limit=${limit}&skip=${(page - 1) * limit}&fields=items(_id, title, price),count`);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
        total: json.result.count,
        isLoading: false,
        page,
      }, 'Загружены товары из АПИ');

    } catch (error) {
      this.setState({
        ...this.getState(),
        error: 'Ошибка сервера (',
        isLoading: false,
      }, 'Изменение статуса ошибки');
    }
  }

}

export default Catalog;
