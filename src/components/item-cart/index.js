import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import {priceFormatting} from "../../utils"
import "./style.css";

function ItemCart(props){
  return (
    <div className='ItemCart'>
      <div className='ItemCart-code'>{props.item.code}</div>
      <div className='ItemCart-title'>
        {props.item.title}
      </div>
      <div className='ItemCart-price'>
        {priceFormatting(props.item.price)}
      </div>
      <div className='ItemCart-count'>
        {`${props.item.count} шт`}
      </div>
      <div className='ItemCart-action'>
        <Controls 
          id={props.item.code} 
          action={props.action} 
          actionName={props.actionName}
        />
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  action: PropTypes.func,
  actionName: PropTypes.string
};

ItemCart.defaultProps = {
  action: () => {},
  actionName: 'Кнопка'
}

export default React.memo(ItemCart);