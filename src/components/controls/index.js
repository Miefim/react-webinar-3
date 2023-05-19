import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

function Controls({id, action, actionName}){
  return (
    <div className='Controls'>
      <button id={id} onClick={action}>{actionName}</button>
    </div>
  )
}

Controls.propTypes = {
  id: PropTypes.number,
  action: PropTypes.func,
  actionName: PropTypes.string
};

Controls.defaultProps = {
  action: () => {},
  actionName: 'Кнопка'
}

export default React.memo(Controls);
