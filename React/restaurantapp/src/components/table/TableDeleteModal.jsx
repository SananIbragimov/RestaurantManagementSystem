import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { deleteTable } from "../../services/tableService";
import { useTranslation } from "../../features/LanguageContext";

function TableDeleteModal({ id, isOpen, onClose, getTables }) {
  const toast = useToast();
  const translations = useTranslation();

  const handleDeleteBtnClick = async () => {
    try {
      let resp = await deleteTable(id);
      if (resp.status === 200) {
        toast({
          title: "Table deleted.",
          description: "The table has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getTables();
        onClose();
      } else {
        toast({
          title: "Failed to delete the table.",
          description: resp.data || "An unexpected error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast({
        title: "Deletion Failed",
        description:
          error.response.data || "The operation could not be completed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.tableDelete}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading>{translations.areYouSure}</Heading>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteBtnClick} colorScheme="red" mr={3}>
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableDeleteModal;
