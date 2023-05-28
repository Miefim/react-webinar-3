import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import PageTools from '../../components/page-tools';
import Navigate from '../../components/navigate';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from '../../components/pagination';
import Loader from '../../components/loader';
import Error from "../../components/error"
import {translator} from "../../utils"
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {

  const store = useStore();

  useEffect(() => {
    if(!select.list.length){
      store.actions.catalog.load(select.page);
    }
  }, []);

  const select = useSelector(state => ({
    language: state.language.language,
    list: state.catalog.list,
    totalElements: state.catalog.total,
    isLoading: state.catalog.isLoading,
    error: state.catalog.error,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Обработка клика пагинации
    setPageHandler: useCallback(async page => {
      await store.actions.catalog.load(page)
      store.actions.catalog.setPage(page)
    }, [store]),
    //Изменение языка
    onChangeLang: useCallback((language) => store.actions.language.change(language), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} language={select.language}/>
    }, [callbacks.addToBasket, select.language]),
  };

  return (
    <PageLayout>
      <Head 
        title={translator('MainHeadTitle', select.language)} 
        onChangeLang={callbacks.onChangeLang} 
        language={select.language}
      />
      <PageTools>
        <Navigate language={select.language} setCatalogPage={callbacks.setPageHandler}/>
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum}
          language={select.language}
        />
      </PageTools>
      {select.isLoading && <Loader language={select.language}/>}
      {select.error && <Error language={select.language}/>}
      {
        !select.isLoading && !select.error && 
        <>
          <List list={select.list} renderItem={renders.item}/>  
          <Pagination 
            total={select.totalElements} 
            limit={10} 
            setPage={callbacks.setPageHandler} 
            activePage={select.page}
          />
        </>
      }
    </PageLayout>
  );
}

export default memo(Main);
