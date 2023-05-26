import {memo, useCallback, useEffect} from "react"
import {useParams} from "react-router-dom"
import {translator} from "../../utils"
import PageLayout from "../../components/page-layout"
import Head from "../../components/head"
import BasketTool from "../../components/basket-tool"
import PageTools from "../../components/page-tools"
import Navigate from "../../components/navigate"
import ProductDescription from "../../components/product-description"
import useStore from "../../store/use-store"
import useSelector from "../../store/use-selector"

function Details() {

   const store = useStore()
   const params = useParams()

   useEffect(() => {
      if(params.id !== select.id){
         store.actions.details.getDetails(params.id)
      }
   },[params.id])

   const select = useSelector(state => ({
      language: state.language.language,
      id: state.details.id,
      title: state.details.title,
      description: state.details.description,
      madeIn: state.details.madeIn,
      price: state.details.price,
      category: state.details.category,
      edition: state.details.edition,
      isLoading: state.details.isLoading, 
      error: state.details.error,
      amount: state.basket.amount,
      sum: state.basket.sum,
      isBasketLoading: state.basket.isLoading,
      basketError: state.basket.error,
   }))

   const callbacks = {
      openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
      addToBasket: useCallback((id) => store.actions.basket.addToBasket(id), [store]),
      onChangeLang: useCallback((language) => store.actions.language.change(language), [store])
   }

   return (
      <PageLayout>
         {select.isLoading && <div className='helperContainer'>{translator('Loading', select.language)}</div>}
         {select.error && <div className='helperContainer'>{translator('ErrorServer', select.language)}</div>}
         {
            !select.error && !select.isLoading &&
            <>
               <Head 
                  title={select.title} 
                  onChangeLang={callbacks.onChangeLang} 
                  language={select.language}
               />
               <PageTools>
                  <Navigate language={select.language}/>
                  <BasketTool 
                     onOpen={callbacks.openModalBasket} 
                     amount={select.amount}
                     sum={select.sum}
                     language={select.language}
                  />
               </PageTools>
               <ProductDescription 
                  product={{
                     id: select.id, 
                     title: select.title, 
                     description: select.description, 
                     madeIn: select.madeIn, 
                     price: select.price, 
                     category: select.category, 
                     edition: select.edition
                  }} 
                  addToBasket={callbacks.addToBasket}
                  isLoading={select.isBasketLoading}
                  error={select.basketError}
                  language={select.language}
               />
            </>
         }       
      </PageLayout>
   )
}

export default memo(Details)