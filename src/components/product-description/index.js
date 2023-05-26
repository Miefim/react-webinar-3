import { memo } from 'react'
import PropTypes from "prop-types"
import {numberFormat, translator} from '../../utils'
import "./style.css"

function ProductDescription ({product, addToBasket, isLoading, error, language}) {
   return(
      <div className='ProductDescription'>
         <div className='ProductDescription-key'>{product.description}</div>
         <div className='ProductDescription-key'>
            {translator('DescriptionMadeIn', language)}: 
            <div className='key-value'>
               {product.madeIn}
            </div>
         </div>
         <div className='ProductDescription-key'>
            {translator('DescriptionCategory', language)}: 
            <div className='key-value'>
               {product.category}
            </div>
         </div>
         <div className='ProductDescription-key'>
            {translator('DescriptionEdition', language)}:
            <div className='key-value'>
               {product.edition}
            </div>
         </div>
         <div className='ProductDescription-price'>
            {translator('DescriptionPrice', language)}: {numberFormat(product.price)} ₽
         </div>
         <button onClick={() => addToBasket(product.id)}>
            {
               !isLoading && !error
               ?  translator('AddToCartButton', language)
               :  isLoading
                  ?  translator('Loading', language)
                  :  translator('ErrorServer', language)
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
   language: PropTypes.string
}

export default memo(ProductDescription)