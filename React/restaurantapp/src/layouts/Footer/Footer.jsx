import React from "react";
import { StyledFooter } from "./Footer.styled";
import { useTranslation } from "../../features/LanguageContext";

function Footer() {
  const translations = useTranslation();

  return (
    <StyledFooter>
      <p style={{ color: "white", fontSize: "15px" }}>
        Copyright © 2024 SanchoCorp. {translations.allRight}.
      </p>
    </StyledFooter>
  );
}

export default Footer;
