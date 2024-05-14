import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const LanguageContext = createContext();

export const useTranslation = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  const lang = useSelector((state) => state.lang.lang);

  useEffect(() => {
    import(`../locales/${lang}/translation.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => console.error("Error", error));
  }, [lang]);

  return (
    <LanguageContext.Provider value={translations}>
      {children}
    </LanguageContext.Provider>
  );
};
