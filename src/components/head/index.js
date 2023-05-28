import {memo} from "react";
import PropTypes from "prop-types";
import LanguageSwitcher from "../language-switcher";
import './style.css';

function Head({title, onChangeLang, language}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageSwitcher language={language} onChangeLang={onChangeLang}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  language: PropTypes.string,
  onChangeLang: PropTypes.func,
};

export default memo(Head);