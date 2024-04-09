import React, { useEffect, useState } from "react";
import { editUser, getUser } from "../../services/userService";
import {
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { registerSchema } from "../../validations/registerSchema";

function UserEditModal({ id, isOpen, onClose, getUsers }) {
  const [imagePreview, setImagePreview] = useState("");
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
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

      editUser(id, formData)
        .then(() => {
          toast({
            title: "User updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getUsers();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to update user.",
            description: e.toString(),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isOpen && id) {
      getUser(id)
        .then((response) => {
          const user = response.data;
          formik.setValues({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            image: null,
          });

          const imageUrl = user.imageUrl
            ? `${process.env.REACT_APP_API_BASE_URL}${user.imageUrl}`
            : "";
          setImagePreview(imageUrl);
        })
        .catch((error) => {
          toast({
            title: "Error fetching user data",
            description: error.toString(),
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [id, isOpen, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl padding={1}>
            <FormLabel>FirstName</FormLabel>
            <Input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="firstName"
              placeholder="Enter FirstName"
              type="text"
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
              type="text"
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
              type="tel"
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
              type="email"
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
              type="password"
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
            {imagePreview && (
              <img
                key={imagePreview}
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <Input
              type="file"
              name="image"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (!file) return; // Handle empty file selection

                formik.setFieldValue("image", file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UserEditModal;
