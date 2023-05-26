import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, translator} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translator('BasketToolInTheBasket', language)}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${
              language === 'RUS' 
              ? plural(amount, {one:'товар', few:'товара', many:'товаров'})
              : plural(amount, {one:'item', other:'items'}, 'en-EN')
            } / ${numberFormat(sum)} ₽`
          : translator('BasketToolEmpty', language)
        }
      </span>
      <button onClick={onOpen}>{translator('OpenCartButton', language)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  language: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  language: 'RUS'
}

export default memo(BasketTool);
