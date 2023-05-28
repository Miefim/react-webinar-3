import {memo, useCallback, useEffect} from "react"
import {useParams} from "react-router-dom"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import BasketTool from "../../components/basket-tool"
import PageTools from "../../components/page-tools"
import Navigate from "../../components/navigate"
import Loader from "../../components/loader"
import Error from "../../components/error"
import ProductDescription from "../../components/product-description"
import useStore from "../../store/use-store"
import useSelector from "../../store/use-selector"

function Details() {

   const store = useStore()
   const params = useParams()
   
   useEffect(() => {
      if(params.id !== select.product.id){
         store.actions.details.getDetails(params.id)
      }
   },[params.id])

   const select = useSelector(state => ({
      language: state.language.language,
      product: state.details,
      amount: state.basket.amount,
      limit: state.catalog.limit,
      sum: state.basket.sum,
      isBasketLoading: state.basket.isLoading,
      basketError: state.basket.error,
   }))

   const callbacks = {
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      addToBasket: useCallback(id => store.actions.basket.addToBasket(id), [store]),
      onChangeLang: useCallback(language => store.actions.language.change(language), [store]),
      getList: useCallback(async page => await store.actions.catalog.load(page, select.limit), [store])
   }

   return (
      <PageLayout>
         {select.product.isLoading && <Loader language={select.language}/>}
         {select.product.error && <Error language={select.language}/>}
         {
            !select.product.error && !select.product.isLoading &&
            <>
               <Head 
                  title={select.product.title} 
                  onChangeLang={callbacks.onChangeLang} 
                  language={select.language}
               />
               <PageTools>
                  <Navigate language={select.language} setCatalogPage={callbacks.getList}/>
                  <BasketTool 
                     onOpen={callbacks.openModalBasket} 
                     amount={select.amount}
                     sum={select.sum}
                     language={select.language}
                  />
               </PageTools>
               <ProductDescription 
                  product={select.product}
                  addToBasket={callbacks.addToBasket}
                  isAddLoading={select.isBasketLoading}
                  addError={select.basketError}
                  language={select.language}
               />
            </>
         }       
      </PageLayout>
   )
}

export default memo(Details)