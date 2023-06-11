import {useCallback, useMemo, useState, useLayoutEffect, useEffect} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices()

  const [lang, setLang] = useState(services.i18n.language)
  const t = useCallback((text, plural) => services.i18n.translate(text, plural), [lang])

  useEffect(() => {services.i18n.setLanguage(lang)}, [lang])

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return services.i18n.subscribe(() => {
      setLang(services.i18n.language)
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return {lang, setLang, t};
}
