import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import {priceFormatting} from "../../utils"
import "./style.css";

function Item({action, actionName, count, ...props}){
  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {priceFormatting(props.item.price)}
      </div>
      {count && 
        <div className='Item-count'>
          {`${count} шт`}
        </div>
      }
      <div className='Item-action'>
        <Controls id={props.item.code} action={action} actionName={actionName}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
  actionName: PropTypes.string,
  count: PropTypes.number
};

Item.defaultProps = {
  action: () => {},
  actionName: 'Кнопка'
}

export default React.memo(Item);