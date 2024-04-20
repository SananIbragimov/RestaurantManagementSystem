import React from "react";
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
import { useFormik } from "formik";
import { postMenu } from "../../services/menuService";
import { menuSchema } from "../../validations/menuSchema";

function MenuAddModal({ isOpen, onClose, onOpen, getMenus }) {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      validFrom: "",
      validFromTime: "",
      validTo: "",
      validToTime: "",
    },
    onSubmit: (values) => {

        const formData = {
            name: values.name,
            validFrom: values.validFrom ? new Date(values.validFrom + 'T' + (values.validFromTime || '00:00')).toISOString() : undefined,
            validTo: values.validTo ? new Date(values.validTo + 'T' + (values.validToTime || '00:00')).toISOString() : undefined
          };

      postMenu(formData)
        .then(() => {
          toast({
            title: "Menu created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getMenus();
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
    validationSchema: menuSchema,
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Menu name</FormLabel>
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

            <FormControl mt={4}>
              <FormLabel>Start date</FormLabel>
              <Input
                type="date"
                name="validFrom"
                value={formik.values.validFrom}
                onChange={formik.handleChange}
              />
              {formik.errors.validFrom && formik.touched.validFrom && (
                <span style={{ color: "red" }}>{formik.errors.validFrom}</span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start time</FormLabel>
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
              <FormLabel>End date</FormLabel>
              <Input
                type="date"
                name="validTo"
                value={formik.values.validTo}
                onChange={formik.handleChange}
              />
              {formik.errors.validTo && formik.touched.validTo && (
                <span style={{ color: "red" }}>{formik.errors.validTo}</span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End time</FormLabel>
              <Input
                type="time"
                name="validToTime"
                value={formik.values.validToTime}
                onChange={formik.handleChange}
              />
              {formik.errors.validToTime && formik.touched.validToTime && (
                <span style={{ color: "red" }}>
                  {formik.errors.validToTime}
                </span>
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
  );
}

export default MenuAddModal;
