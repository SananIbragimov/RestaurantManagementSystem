import React from "react";
import { useTranslation } from "../features/LanguageContext";

function NotFound() {
  const translations = useTranslation();

  return <div>{translations.notFound}</div>;
}

export default NotFound;
