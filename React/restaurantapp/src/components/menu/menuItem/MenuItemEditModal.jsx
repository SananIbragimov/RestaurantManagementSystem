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
import { editMenuItem, getAllMenuItemsByMenuId, getMenuItem } from "../../../services/menuService";

function MenuItemEditModal({ id, isOpen, onClose, getMenuItems }) {
  const [menuItems, setMenuItems] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      getMenuItem(id).then((response) => {
        const item = response.data;
        setMenuId(item.menuId);
        formik.setValues({
          menuId: item.menuId,
          productId: item.productId,
          promotionalPrice: item.promotionalPrice || 0,
        });
      });
    }
  }, [id]);

  useEffect(() => {
    getAllProducts(1, 10)
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getAllMenuItemsByMenuId(menuId)
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((e) => console.error(e));
  }, [menuId]);

  const formik = useFormik({
    initialValues: {
      menuId: menuId,
      productId: "",
      promotionalPrice: 0,
    },

    validationSchema: menuItemSchema,

    onSubmit: (values) => {
      const otherItems = menuItems.filter((item) => item.id !== id);

      const isProductExists = otherItems.some(
        (item) => item.productId === parseInt(values.productId)
      );

      if (isProductExists) {
        toast({
          title: "Error",
          description:
            "This product is already added to the menu. Please select a different product.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const dataToSend = {
        menuId: values.menuId,
        productId: parseInt(values.productId),
        promotionalPrice: values.promotionalPrice
          ? parseFloat(values.promotionalPrice.replace(",", "."))
          : null,
      };
      editMenuItem(id, dataToSend)
        .then((res) => {
          toast({
            title: "MenuItem updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getMenuItems();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to update MenuItem.",
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

export default MenuItemEditModal;
