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
import { editProduct, getProduct } from "../../services/productService";
import { useFormik } from "formik";
import { productSchema } from "../../validations/productSchema";

export default function ProductEditModal({ id, isOpen, onClose, getProducts }) {
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const toast = useToast();
  

  useEffect(() => {
    let active = true;

    const fetchCategoriesAndProduct = async () => {
      try {
        const categoriesRes = await getAllCategories(1, 10);
        if (active) {
          setCategories(categoriesRes.data.items);
        }

        if (id) {
          const productRes = await getProduct(id);
          const formattedPrice = productRes.data.price.toString().replace('.', ',');
          if (active) {
            const selectedCategory = categoriesRes.data.items.find(
              (category) => category.name === productRes.data.categoryName
            );
            const imageUrl = `${process.env.REACT_APP_API_BASE_URL}${productRes.data.imageUrl}?${new Date().getTime()}`;
                
            formik.setValues({
              name: productRes.data.name,
              price: formattedPrice,
              categoryId: selectedCategory ? selectedCategory.id : "",
              image: null,
            });
            setImagePreview(imageUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesAndProduct();

    // Cleanup function to avoid setting state on unmounted component
    return () => {
      active = false;
    };
  }, [id, isOpen]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      categoryId: "",
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      if (values.image) {
        formData.append("image", values.image);
      }

      editProduct(id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          toast({
            title: "Product updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getProducts();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to update product.",
            description: e.toString(),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Product update failed:", e);
        })
        .finally(() => formik.resetForm());
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update product</ModalHeader>
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
    </>
  );
}
