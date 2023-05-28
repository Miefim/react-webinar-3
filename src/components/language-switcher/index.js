import {memo} from "react"
import PropTypes from "prop-types"
import "./style.css"

function LanguageSwitcher({language, onChangeLang}) {
   return(
      <select 
         className='LanguageSwitcher' 
         value={language} 
         onChange={(e) => onChangeLang(e.target.value)}
      >
        <option>RUS</option>
        <option>ENG</option>
      </select>
   )
}

LanguageSwitcher.propTypes = {
   language: PropTypes.string,
   onChangeLang: PropTypes.func,
};
 
LanguageSwitcher.defaultProps = {
   onChangeLang: () => {},
}

export default memo(LanguageSwitcher)