import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List({list, renderItem}){
  return (
    <div className='List'>{list.map(item => renderItem(item))}</div>
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default React.memo(List);