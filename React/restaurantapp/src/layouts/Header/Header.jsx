import React from 'react'
import { StyledHeader } from './Header.styled'
import { Input, InputGroup, InputRightElement, Tab, TabList, Tabs } from '@chakra-ui/react'
import {SearchIcon} from '@chakra-ui/icons'

function Header() {
  return (
    <StyledHeader>
        <h1 style={{color: '#f6e2ea', fontSize: '30px'}}>CROWN</h1>
        <InputGroup width='25%' backgroundColor='aliceblue'>
          <Input type='text' placeholder='Search products...' border='none'/>
          <InputRightElement pointerEvents='none'>
          <SearchIcon color='gray.400' rotate='45deg'/>
          </InputRightElement>
      </InputGroup>
      <Tabs>
        <TabList>
          <Tab color='#f9a66c'>EN</Tab>
          <Tab color='#f9a66c'>AZ</Tab>
        </TabList>
      </Tabs>
    </StyledHeader>
  )
}

export default Header