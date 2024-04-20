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
import { useFormik } from "formik";
import { getAllProducts } from "../../../services/productService";
import { menuItemSchema } from "../../../validations/menuItemSchema";
import { getAllMenuItemsByMenuId, postMenuItem } from "../../../services/menuService";

function MenuItemAddModal({ isOpen, onClose, menuId, getMenus }) {
  const [menuItems, setMenuItems] = useState([]);
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAllProducts(1, 10)
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    let isCancelled = false;
  
    const fetchMenuItems = async () => {
      try {
        const response = await getAllMenuItemsByMenuId(menuId);
        if (!isCancelled) {
                const uniqueItems = Array.from(
          new Set(response.data.map((a) => a.productId))
        ).map((productId) => {
          return response.data.find((a) => a.productId === productId);
        });
        setMenuItems(uniqueItems);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMenuItems();
  
    return () => {
      isCancelled = true;
    };
  }, [menuId]);
  
  const formik = useFormik({
    initialValues: {
      menuId: menuId,
      productId: "",
      promotionalPrice: 0,
    },

    validationSchema: menuItemSchema,

    onSubmit: (values) => {
      const isExistingProduct = menuItems.find(item => item.productId === parseInt(values.productId));

      if (isExistingProduct) {
          toast({
              title: 'Error',
              description: 'This product has already been added to the menu.',
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
          return; 
      }

        const dataToSend = {
            menuId: values.menuId,
            productId: parseInt(values.productId),
            promotionalPrice: values.promotionalPrice ? parseFloat(values.promotionalPrice.replace(',', '.')) : null
          };
      postMenuItem(dataToSend)
        .then((res) => {
          toast({
            title: "MenuItem created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getMenus();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to create MenuItem.",
            description: e.toString(),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => formik.resetForm());
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create MenuItem</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Promotional Price</FormLabel>
              <Input
                value={formik.values.promotionalPrice}
                onChange={(event) => {
                  const value = event.target.value.replace(".", ",");
                  if (/^[0-9]*,?[0-9]*$/.test(value)) {
                    formik.setFieldValue("promotionalPrice", value);
                  }
                }}
                onBlur={formik.handleBlur}
                name="promotionalPrice"
                placeholder="Enter price"
                type="text"
              />
              {formik.touched.promotionalPrice &&
                formik.errors.promotionalPrice && (
                  <p style={{ color: "red" }}>
                    {formik.errors.promotionalPrice}
                  </p>
                )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product</FormLabel>
              <Select
                placeholder="Select product"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productId}
                name="productId"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
              {formik.touched.productId && formik.errors.productId && (
                <p style={{ color: "red" }}>{formik.errors.productId}</p>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default MenuItemAddModal;
