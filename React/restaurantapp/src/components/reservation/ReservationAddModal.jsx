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
import { reservationSchema } from "../../validations/reservationSchema";
import { postReservation } from "../../services/reservationService";
import { getAllTables } from "../../services/tableService";
import { useTranslation } from "../../features/LanguageContext";

function ReservationAddModal({ isOpen, onClose, onOpen, getReservations }) {
  const [tables, setTables] = useState([]);
  const toast = useToast();
  const translations = useTranslation();

  useEffect(() => {
    getAllTables(1, 10)
      .then((res) => {
        setTables(res.data.items);
      })
      .catch((e) => console.error(e));
  }, []);

  const formik = useFormik({
    initialValues: {
      tableId: "",
      reservationTime: "",
      validFromTime: "",
      customerName: "",
      customerPhone: "",
    },
    validationSchema: reservationSchema,
    onSubmit: (values) => {
      let reservationDateTime =
        values.reservationTime && values.validFromTime
          ? new Date(values.reservationTime + "T" + values.validFromTime)
          : undefined;

      if (reservationDateTime) {
        reservationDateTime = new Date(
          reservationDateTime.getTime() -
            reservationDateTime.getTimezoneOffset() * 60000
        ).toISOString();
      }

      const formData = {
        tableId: values.tableId,
        reservationTime: reservationDateTime,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
      };

      postReservation(formData)
        .then(() => {
          toast({
            title: "Reservation created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getReservations();
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
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        {translations.add}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.reserveCreate}</ModalHeader>
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
              <FormLabel>{translations.reserveTime}</FormLabel>
              <Input
                type="date"
                name="reservationTime"
                value={formik.values.reservationTime}
                onChange={formik.handleChange}
              />
              {formik.errors.reservationTime &&
                formik.touched.reservationTime && (
                  <span style={{ color: "red" }}>
                    {formik.errors.reservationTime}
                  </span>
                )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{translations.reserveTime}</FormLabel>
              <Input
                type="time"
                name="validFromTime"
                value={formik.values.validFromTime}
                onChange={formik.handleChange}
              />
              {formik.errors.validFromTime && formik.touched.validFromTime && (
                <span style={{ color: "red" }}>
                  {formik.errors.validFromTime}
                </span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{translations.firstName}</FormLabel>
              <Input
                value={formik.values.customerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="customerName"
                placeholder="Enter name"
              />
              {formik.touched.customerName && formik.errors.customerName && (
                <p style={{ color: "red" }}>{formik.errors.customerName}</p>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>{translations.phoneNumber}</FormLabel>
              <Input
                value={formik.values.customerPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="customerPhone"
                placeholder="Enter PhoneNumber"
                type="tel"
              />
              {formik.touched.customerPhone && formik.errors.customerPhone && (
                <p style={{ color: "red" }}>{formik.errors.customerPhone}</p>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReservationAddModal;
