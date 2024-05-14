import React, { useEffect, useState } from "react";
import { StyledHeader, StyledHeading2 } from "./Header.styled";
import {
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "../../features/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../../redux/slices/langSlice";
import { getProductByName } from "../../services/productService";

function Header() {
  const translations = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.lang.lang);
  const [tabIndex, setTabIndex] = useState(currentLang === "en" ? 0 : 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedProduct, setMatchedProduct] = useState(null);

  useEffect(() => {
    setTabIndex(currentLang === "en" ? 0 : 1);
  }, [currentLang]);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    const lang = index === 0 ? "en" : "az";
    dispatch(changeLang(lang));
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      try {
        const response = await getProductByName(query);
        console.log("API Response:", response);
        if (response.data) {
          setMatchedProduct(response.data);
        } else {
          setMatchedProduct(null);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setMatchedProduct(null);
      }
    } else {
      setMatchedProduct(null);
    }
  };

  return (
    <StyledHeader>
      <Link to="/">
        <StyledHeading2>CROWN</StyledHeading2>
      </Link>
      <InputGroup width="25%" backgroundColor="aliceblue">
        <Input
          type="text"
          placeholder={translations.searchPlaceholder}
          border="none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.400" rotate="45deg" />
        </InputRightElement>
      </InputGroup>
      {matchedProduct && (
        <div style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
          {translations.found}: {matchedProduct.name}
        </div>
      )}
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab color="#f9a66c" onClick={() => dispatch(changeLang("en"))}>
            EN
          </Tab>
          <Tab color="#f9a66c" onClick={() => dispatch(changeLang("az"))}>
            AZ
          </Tab>
        </TabList>
      </Tabs>
    </StyledHeader>
  );
}

export default Header;
