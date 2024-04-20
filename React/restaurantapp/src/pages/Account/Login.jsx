import React from 'react'
import {
    Flex,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
  } from '@chakra-ui/react';
import LoginForm from '../../components/account/LoginForm';

function Login() {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex  width='30%'
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <LoginForm />
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="light_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="light_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  )
}

export default Login