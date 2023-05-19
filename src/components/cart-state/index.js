import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import {plural, totalCalculation, priceFormatting} from "../../utils"
import "./style.css";

function CartState({cartList, action, actionsName}){
   const cartState = `${cartList.length} ${plural(cartList.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${priceFormatting(totalCalculation(cartList))}`
   return (
      <div className='CartState'>
         В корзине:
         <div className='CartState-count'>
            {
               !cartList.length 
               ?  'пусто' 
               :  cartState
            }  
         </div>
         <Controls action={action} actionName={actionsName}/>
      </div>
   )
}

Controls.propTypes = {
   cartList: PropTypes.array,
   action: PropTypes.func,
   actionName: PropTypes.string
};

Controls.defaultProps = {
   action: () => {},
   actionName: 'Кнопка'
}

export default React.memo(CartState);