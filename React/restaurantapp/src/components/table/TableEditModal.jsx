import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
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
import { tableSchema } from "../../validations/tableSchema";
import { editTable, getTable } from "../../services/tableService";
import { useTranslation } from "../../features/LanguageContext";

function TableEditModal({ id, isOpen, onClose, getTables }) {
  const toast = useToast();
  const translations = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      isReserved: false,
      reservationTime: null,
      validFromTime: null,
      tableStatus: "",
      capacity: "",
    },
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
        name: values.name,
        isReserved: values.isReserved,
        reservationTime: reservationDateTime,
        tableStatus: values.tableStatus,
        capacity: values.capacity,
      };

      editTable(id, formData)
        .then(() => {
          toast({
            title: "Table updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getTables();
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
    validationSchema: tableSchema,
  });

  useEffect(() => {
    if (isOpen && id) {
      getTable(id)
        .then((response) => {
          const table = response.data;
          const reservationDateTime = new Date(table.reservationTime);

          const localReservationDate = new Date(
            reservationDateTime.getTime() -
              reservationDateTime.getTimezoneOffset() * 60000
          ).toISOString();

          const reservationDate = localReservationDate.split("T")[0]; // 'YYYY-MM-DD'
          const reservationTime = localReservationDate
            .split("T")[1]
            .substring(0, 5);

          formik.setValues({
            name: table.name,
            isReserved: table.isReserved,
            reservationTime: reservationDate,
            validFromTime: reservationTime,
            tableStatus: table.tableStatus,
            capacity: table.capacity,
          });
        })
        .catch((error) => {
          toast({
            title: "Error fetching table data",
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
        <ModalHeader>{translations.tableUpdate}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>{translations.tableName}</FormLabel>
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

          <FormControl padding={1}>
            <FormLabel>IsReserved</FormLabel>
            <Select
              name="isReserved"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isReserved}
              isDisabled={true}
            >
              <option value="">Select a value</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </Select>
            {formik.touched.isReserved && formik.errors.isReserved && (
              <p style={{ color: "red" }}>{formik.errors.isReserved}</p>
            )}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{translations.reserveTime}</FormLabel>
            <Input
              type="date"
              name="reservationTime"
              value={formik.values.reservationTime}
              onChange={formik.handleChange}
              isDisabled={true}
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
              isDisabled={true}
            />
            {formik.errors.validFromTime && formik.touched.validFromTime && (
              <span style={{ color: "red" }}>
                {formik.errors.validFromTime}
              </span>
            )}
          </FormControl>

          <FormControl padding={1}>
            <FormLabel>Table Status</FormLabel>
            <Select
              name="tableStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tableStatus}
              isDisabled={true}
            >
              <option value="">Select a value</option>
              <option value="1">Available</option>
              <option value="2">Reserved</option>
              <option value="3">Occupied</option>
            </Select>
            {formik.touched.tableStatus && formik.errors.tableStatus && (
              <p style={{ color: "red" }}>{formik.errors.tableStatus}</p>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>{translations.tableCapacity}</FormLabel>
            <Input
              value={formik.values.capacity}
              name="capacity"
              onChange={formik.handleChange}
              type="number"
            />
            {formik.errors.capacity && formik.touched.capacity && (
              <span style={{ color: "red" }}>{formik.errors.capacity}</span>
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
  );
}

export default TableEditModal;
