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
import { useTranslation } from "../../features/LanguageContext";

function MenuAddModal({ isOpen, onClose, onOpen, getMenus }) {
  const toast = useToast();
  const translations = useTranslation();

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
        validFrom: values.validFrom
          ? new Date(
              values.validFrom + "T" + (values.validFromTime || "00:00")
            ).toISOString()
          : undefined,
        validTo: values.validTo
          ? new Date(
              values.validTo + "T" + (values.validToTime || "00:00")
            ).toISOString()
          : undefined,
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
        {translations.add}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.menuCreate}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{translations.menuName}</FormLabel>
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
              <FormLabel>{translations.startDate}</FormLabel>
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
              <FormLabel>{translations.startTime}</FormLabel>
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
              <FormLabel>{translations.endDate}</FormLabel>
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
              <FormLabel>{translations.endTime}</FormLabel>
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
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MenuAddModal;
