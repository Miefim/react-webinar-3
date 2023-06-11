import * as translations from './translations';

class I18nService {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config
    this.language = this.config?.initialLanguage || 'ru'
    this.listeners = []
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  setLanguage(language) {
    this.language = language
    this.services.api.setHeader('X-Lang', this.language)
    for (const listener of this.listeners) listener(this.language)
  }

  translate(text, plural) {
    
    let result = translations[this.language] && (text in translations[this.language])
      ? translations[this.language][text]
      : text;
  
    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(this.language).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
  
    return result;
  }
}

export default I18nService