import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({list, action, actionName}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item 
            item={item} 
            count={item.count} 
            action={action} 
            actionName={actionName}
          />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  action: PropTypes.func,
  actionName: PropTypes.string
};

List.defaultProps = {
  action: () => {},
  actionName: 'Кнопка'
}

export default React.memo(List);
