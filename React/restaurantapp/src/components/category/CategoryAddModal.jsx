import React from 'react'
import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    FormLabel,
    ModalFooter,
    useToast,
  } from "@chakra-ui/react";
  import { postCategory } from "../../services/categoryService";
  import { useFormik } from "formik";
  import { categorySchema } from "../../validations/categorySchema";

function CategoryAddModal({ isOpen, onClose, onOpen, getCategories }) {
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
          name: "",
        },
        onSubmit: (values) => {
          postCategory(values)
            .then(() => {
              toast({
                title: "Category created.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              getCategories();
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
              onClose();
              formik.resetForm();
            });
        },
        validationSchema: categorySchema
      });

  return (
    <>
        <Button colorScheme='blue' onClick={onOpen}>Add</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category name</FormLabel>
              <Input
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                placeholder="Enter name"
              />
               {formik.errors.name && formik.touched.name && (
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CategoryAddModal