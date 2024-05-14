import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Select,
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
import { useFormik } from "formik";
import { postOrder } from "../../services/orderService";
import { getAllTables } from "../../services/tableService";
import { getAllUsers } from "../../services/userService";
import orderSchema from "../../validations/orderSchema";
import { useTranslation } from "../../features/LanguageContext";

function OrderAddModal({ isOpen, onClose, onOpen, getOrders }) {
  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const translations = useTranslation();

  useEffect(() => {
    getAllTables(1, 10)
      .then((res) => {
        setTables(res.data.items);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    getAllUsers(1, 10)
      .then((res) => {
        setUsers(res.data.items);
      })
      .catch((e) => console.error(e));
  }, []);

  const formik = useFormik({
    initialValues: {
      tableId: "",
      appUserId: "",
    },
    onSubmit: (values) => {
      const formData = {
        tableId: values.tableId,
        appUserId: values.appUserId,
      };

      postOrder(formData)
        .then(() => {
          toast({
            title: "Order created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getOrders();
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
    validationSchema: orderSchema,
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        {translations.add}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.orderCreate}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>{translations.table}</FormLabel>
              <Select
                placeholder="Select table"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tableId}
                name="tableId"
              >
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name}
                  </option>
                ))}
              </Select>
              {formik.touched.tableId && formik.errors.tableId && (
                <p style={{ color: "red" }}>{formik.errors.tableId}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{translations.user}</FormLabel>
              <Select
                placeholder="Select user"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.appUserId}
                name="appUserId"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName}
                  </option>
                ))}
              </Select>
              {formik.touched.appUserId && formik.errors.appUserId && (
                <p style={{ color: "red" }}>{formik.errors.appUserId}</p>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={formik.handleSubmit} colorScheme="blue" mr={3}>
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderAddModal;
