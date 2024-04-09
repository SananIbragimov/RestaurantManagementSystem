import React from 'react';
import {Navigate} from 'react-router-dom';
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useFormik } from "formik";
import { useSelector } from 'react-redux';
import { postRegister } from '../../services/registerService';
import { registerSchema } from '../../validations/registerSchema';

function RegisterForm() {
    const toast = useToast();
    const token = useSelector(state => state.account.token);
    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
          role: "",
          image: null,
        },
        validationSchema: registerSchema,
        
        onSubmit: (values) => {
          const formData = new FormData();
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("phoneNumber", values.phoneNumber);
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("role", values.role);
          if (values.image) {
            formData.append("image", values.image);
          }
          postRegister(formData, token)
            .then((res) => {

              toast({
                title: "Account created.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              <Navigate to="/" />
            })
            .catch((e) => {
              toast({
                title: "Failed to create account.",
                description: e.toString(),
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              console.error("Account creation failed:", e);
            })
            .finally(() => formik.resetForm());
        },
      });

  return (
    <div style={{width: '100%', display:'flex', justifyContent:'center'}}>
        <Box bg='white' w='30%' p={3} borderRadius='lg'>
            <form autoComplete="on" onSubmit={formik.handleSubmit}>
            <FormControl padding={1}>
              <FormLabel>FirstName</FormLabel>
              <Input
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="firstName"
                placeholder="Enter FirstName"
                type='text'
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p style={{ color: "red" }}>{formik.errors.firstName}</p>
              )}
            </FormControl>

            <FormControl padding={1}>
              <FormLabel>LastName</FormLabel>
              <Input
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="lastName"
                placeholder="Enter LastName"
                type='text'
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p style={{ color: "red" }}>{formik.errors.lastName}</p>
              )}
            </FormControl>

            <FormControl padding={1}>
              <FormLabel>PhoneNumber</FormLabel>
              <Input
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phoneNumber"
                placeholder="Enter PhoneNumber"
                type='tel'
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
              )}
            </FormControl>

            <FormControl padding={1}>
              <FormLabel>Email</FormLabel>
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                placeholder="Enter Email"
                type='email'
              />
              {formik.touched.email && formik.errors.email && (
                <p style={{ color: "red" }}>{formik.errors.email}</p>
              )}
            </FormControl>

            <FormControl padding={1}>
              <FormLabel>Password</FormLabel>
              <Input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                placeholder="Enter Password"
                type='password'
              />
              {formik.touched.password && formik.errors.password && (
                <p style={{ color: "red" }}>{formik.errors.password}</p>
              )}
            </FormControl>

            <FormControl padding={1}>
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <p style={{ color: "red" }}>{formik.errors.role}</p>
                )}
              </FormControl>

            <FormControl mt={4}>
              <FormLabel>Photo</FormLabel>
              <Input
                type="file"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </FormControl>

                <Button
                    type='submit'
                    w='full' bg='brand.green' size={'lg'}
                    textTransform='uppercase' fontWeight={'normal'}
                    letterSpacing='wide' boxShadow='0 3px hsl(154, 59%, 65%)'
                    _hover={{ filter: 'brightness(0.9)' }}
                >
                    Register
                </Button>
            </form>
        </Box>
    </div>
  )
}

export default RegisterForm