import React, { useEffect, useState } from 'react'
import { StyledHeader, StyledHeading2 } from './Header.styled'
import { Input, InputGroup, InputRightElement, Tab, TabList, Tabs } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../features/LanguageContext'
import { useDispatch, useSelector } from 'react-redux'
import { changeLang } from '../../redux/slices/langSlice'

function Header() {
  const translations = useTranslation();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.lang.lang);
  const [tabIndex, setTabIndex] = useState(currentLang === 'en' ? 0 : 1);

  useEffect(() => {
    setTabIndex(currentLang === 'en' ? 0 : 1);
  }, [currentLang]);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    const lang = index === 0 ? 'en' : 'az';
    dispatch(changeLang(lang));
  };

  return (
    <StyledHeader>
        <Link to='/'><StyledHeading2>CROWN</StyledHeading2></Link>
        <InputGroup width='25%' backgroundColor='aliceblue'>
          <Input type='text' placeholder={translations.searchPlaceholder} border='none'/>
          <InputRightElement pointerEvents='none'>
          <SearchIcon color='gray.400' rotate='45deg'/>
          </InputRightElement>
      </InputGroup>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab color='#f9a66c'  onClick={() => dispatch(changeLang('en'))}>EN</Tab>
          <Tab color='#f9a66c'  onClick={() => dispatch(changeLang('az'))}>AZ</Tab>
        </TabList>
      </Tabs>
    </StyledHeader>
  )
}

export default Header