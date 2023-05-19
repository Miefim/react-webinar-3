import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({visible, setVisible, children}){
  return (
    <div className={`Modal ${visible && 'Modal_active'}`} onClick={setVisible}>
      <div className='Modal-content' onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  children: PropTypes.node
};

Modal.defaultProps = {
  setVisible: () => {}
}

export default React.memo(Modal);