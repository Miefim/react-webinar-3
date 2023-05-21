import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import {priceFormatting} from "../../utils"
import "./style.css";

function Item(props){
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {priceFormatting(props.item.price)}
      </div>
      <div className='Item-action'>
        <Controls 
          id={props.item.code} 
          action={props.action} 
          actionName={props.actionName}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
  actionName: PropTypes.string
};

Item.defaultProps = {
  action: () => {},
  actionName: 'Кнопка'
}

export default React.memo(Item);