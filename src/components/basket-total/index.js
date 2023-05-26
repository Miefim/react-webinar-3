import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translator} from "../../utils";
import './style.css';

function BasketTotal({sum, language='RUS'}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translator('BasketTotal', language)}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  language: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
