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
import orderItemSchema from "../../../validations/orderItemSchema";
import { getOrderItem, postOrderItem } from "../../../services/orderService";
import { useTranslation } from "../../../features/LanguageContext";

function OrderItemEditModal({ id, isOpen, onClose, getOrderItems }) {
  const [orderId, setOrderId] = useState(null);
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const translations = useTranslation();

  useEffect(() => {
    if (id) {
      getOrderItem(id).then((response) => {
        const item = response.data;
        setOrderId(item.orderId);
        formik.setValues({
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
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

  const formik = useFormik({
    initialValues: {
      orderId: orderId,
      productId: "",
      quantity: 0,
    },

    validationSchema: orderItemSchema,

    onSubmit: (values) => {
      const dataToSend = {
        orderId: values.orderId,
        productId: parseInt(values.productId),
        quantity: values.quantity,
      };
      console.log(dataToSend);
      postOrderItem(dataToSend)
        .then((res) => {
          toast({
            title: "OrderItem updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getOrderItems();
          onClose();
        })
        .catch((e) => {
          toast({
            title: "Failed to update OrderItem.",
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
        <ModalHeader>{translations.orderItemUpdate}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>{translations.product}</FormLabel>
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
            <FormControl mt={4}>
              <FormLabel>{translations.quantity}</FormLabel>
              <Input
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="quantity"
                placeholder="Enter quantity"
                type="num"
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <p style={{ color: "red" }}>{formik.errors.quantity}</p>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default OrderItemEditModal;
