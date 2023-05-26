import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onChangeLang, language}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <select value={language} onChange={(e) => onChangeLang(e.target.value)}>
        <option>RUS</option>
        <option>ENG</option>
      </select>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string,
  onChangeLang: PropTypes.func,
};

Head.defaultProps = {
  onChangeLang: () => {},
}

export default memo(Head);
