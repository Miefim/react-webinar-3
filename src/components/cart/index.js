import React from "react";
import PropTypes from "prop-types";
import {totalCalculation, priceFormatting} from "../../utils"
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import ItemCart from "../item-cart";
import "./style.css";

function Cart({cartList, onCloseCart, onDeleteCartItem}){
  const isEmptyCart = cartList.length === 0
  return (
      <div className='Cart'>
        <Head title='Корзина'>
          <Controls 
            action={onCloseCart} 
            actionName='Закрыть' 
          />
        </Head>
        <div className='Cart-container'>
          {
            isEmptyCart
            ? 
              <div className='container-helper'>Пустая корзина</div>
            :
              <List 
                list={cartList} 
                renderItem={(item) => 
                  <ItemCart 
                    item={item} 
                    key={item.code} 
                    action={onDeleteCartItem} 
                    actionName='Удалить'
                  />
                }
              />
          }
          {!isEmptyCart && 
            <div className='container-footer'>
              Итого
              <div className='footer-total'>
                {priceFormatting(totalCalculation(cartList))}
              </div>
            </div>
          }
        </div>
      </div>
  )
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  onCloseCart: PropTypes.func, 
  onDeleteCartItem: PropTypes.func
};

Cart.defaultProps = {
  onCloseCart: () => {},
  onDeleteCartItem: () => []
};

export default React.memo(Cart);