import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Heading, Input, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik/dist";
import { postLogin } from "../../services/loginService";
import { loginSchema } from "../../validations/loginSchema";
import { logInAction } from "../../redux/slices/accountSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      postLogin(values)
        .then((res) => {
          dispatch(
            logInAction({
              userName: res.data.userName,
              token: res.data.token,
              role: res.data.role,
              imageUrl: res.data.imageUrl
            })
          );
          toast({
            title: "Login successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          navigate("/");
        })
        .catch((e) => {
          toast({
            title: e.message,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          formik.resetForm();
        });
    },
    validationSchema: loginSchema,
  });

  return (
    <>
      <Heading mb={6}>Log In</Heading>
      <Input
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        placeholder="johndoe@gmail.com"
        type="email"
        variant="filled"
        mb={3}
      />
      {formik.errors.email && formik.touched.email && (
        <span style={{ color: "red" }}>{formik.errors.email}</span>
      )}
      <Input
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        placeholder="**********"
        type="password"
        variant="filled"
        mb={6}
      />
      {formik.errors.password && formik.touched.password && (
        <span style={{ color: "red" }}>{formik.errors.password}</span>
      )}
      <Button onClick={formik.handleSubmit} colorScheme="teal" mb={8}>
        Log In
      </Button>
    </>
  );
}

export default LoginForm;
