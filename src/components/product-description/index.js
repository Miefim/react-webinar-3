import { memo } from 'react'
import PropTypes from "prop-types"
import {numberFormat} from '../../utils'
import "./style.css"

function ProductDescription ({product, addToBasket, isLoading, error}) {
   return(
      <div className='ProductDescription'>
         <div className='ProductDescription-key'>{product.description}</div>
         <div className='ProductDescription-key'>
            Страна производитель: 
            <div className='key-value'>
               {product.madeIn}
            </div>
         </div>
         <div className='ProductDescription-key'>
            Категория: 
            <div className='key-value'>
               {product.category}
            </div>
         </div>
         <div className='ProductDescription-key'>
            Год выпуска:
            <div className='key-value'>
               {product.edition}
            </div>
         </div>
         <div className='ProductDescription-price'>
            Цена: {numberFormat(product.price)} ₽
         </div>
         <button onClick={() => addToBasket(product.id)}>
            {
               !isLoading && !error
               ?  'Добавить'
               :  isLoading
                  ?  'Загрузка...'
                  :  error
            }
         </button>
      </div>
   )
}

ProductDescription.propTypes = {
   product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      madeIn: PropTypes.string,
      category: PropTypes.string,
      edition: PropTypes.number,
      price: PropTypes.number,
   }).isRequired,
   addToBasket: PropTypes.func,
   isLoading: PropTypes.bool,
   error: PropTypes.string,
}

export default memo(ProductDescription)