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
import { deleteCategory } from "../../services/categoryService";
import { useTranslation } from "../../features/LanguageContext";

function CategoryDeleteModal({ id, isOpen, onClose, getCategories }) {
  const toast = useToast();
  const translations = useTranslation();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteCategory(id);
    if (resp.status === 200) {
      toast({
        title: "Category deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getCategories();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.categoryDelete}</ModalHeader>
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

export default CategoryDeleteModal;
