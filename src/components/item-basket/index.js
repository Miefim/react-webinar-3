import {memo} from 'react';
import {Link} from 'react-router-dom';
import {numberFormat, translator, plural} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {
  
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onCloseModal: () => props.onCloseModal()
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link 
          to={props.link} 
          className={cn('link')} 
          onClick={callbacks.onCloseModal}
        >
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {`
            ${numberFormat(props.item.amount || 0)} 
            ${
              props.language === 'RUS'
              ? 'шт'
              : plural(props.item.amount, {one:'pc', other:'pcs'}, 'en-EN')
            }
          `}
        </div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{translator('DeleteButton', props.language)}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onRemove: PropTypes.func,
  language: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
