import {memo, useCallback, useEffect} from "react"
import {useParams} from "react-router-dom"
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
      addToBasket: useCallback((id) => store.actions.basket.addToBasket(id), [store])
   }

   return (
      <PageLayout>
         {select.error && <div className='helperContainer'>{select.error}</div>}
         {select.isLoading && <div className='helperContainer'>Загрузка...</div>}
         {
            !select.error && !select.isLoading &&
            <>
               <Head title={select.title}/>
               <PageTools>
                  <Navigate/>
                  <BasketTool 
                     onOpen={callbacks.openModalBasket} 
                     amount={select.amount}
                     sum={select.sum}
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
               />
            </>
         }       
      </PageLayout>
   )
}

export default memo(Details)