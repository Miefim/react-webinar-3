/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortByHierarchy(items) {
  let degree = 0
  const result = []

  const findChildren = (parentId) => {
    degree ++ 
    const children = items.filter(item => item.parent?._id === parentId)
    children.forEach(child => {
      result.push({value: child._id, title: child.title, degree})
      findChildren(child._id)
    })
    degree -- 
  }

  const parents = items.filter(item => !item.parent)
  parents.forEach(parent => {
    result.push({value: parent._id, title: parent.title, degree})
    findChildren(parent._id)
  })

  result.forEach(el => {
    [...new Array(el.degree)].forEach(() => el.title = `- ${el.title}`)
  })

  return [{value: '', title: 'Все'},...result];
}

export function validatorUlrCategoryParam(categoryParam, validCategoryParams) {
  const param = validCategoryParams.find(el => el._id === categoryParam)
  return param ? param._id : ''
}

export function loginValidator(login) {
  if(!login.trim().length){
    return 'Введите логин'
  } 
}

export function passwordValidator(pas) {
  if(!pas.trim().length){
    return 'Введите пароль'
  } 
  else if(pas.trim().length < 3){
    return 'Пароль должен быть длиннее'
  }
}