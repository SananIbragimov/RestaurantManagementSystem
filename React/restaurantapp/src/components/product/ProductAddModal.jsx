import React, { useEffect, useState } from "react";
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
import { getAllCategories } from "../../services/categoryService";
import { postProduct } from "../../services/productService";
import { useFormik } from "formik";
import { productSchema } from "../../validations/productSchema";

export default function ProductAddModal({ isOpen, onOpen, onClose, getProducts }) {
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAllCategories(1,10)
      .then((res) => {
      setCategories(res.data.items)
      }
      )
      .catch((e) => console.error(e));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      categoryId: "",
      image: null,
    },
    validationSchema: productSchema,
    validate: (values) => {
        const errors = {};
        if (!values.image) {
          errors.image = "Photo is required!";
        }
        return errors;
      },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      if (values.image) {
        formData.append("image", values.image);
      }

      postProduct(formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }})
        .then((res) => {
          toast({
            title: "Product created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getProducts();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to create product.",
            description: e.toString(),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Product creation failed:", e);
        })
        .finally(() => formik.resetForm());
    },
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                placeholder="Enter name"
              />
              {formik.touched.name && formik.errors.name && (
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                value={formik.values.price}
                onChange={(event) => {
                  const value = event.target.value.replace('.', ',');
                  if (/^[0-9]*\,?[0-9]*$/.test(value)) {
                    formik.setFieldValue('price', value);
                  }
                }}
                onBlur={formik.handleBlur}
                name="price"
                placeholder="Enter price"
                type="text"
              />
              {formik.touched.price && formik.errors.price && (
                <p style={{ color: "red" }}>{formik.errors.price}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryId}
                name="categoryId"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <p style={{ color: "red" }}>{formik.errors.categoryId}</p>
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
