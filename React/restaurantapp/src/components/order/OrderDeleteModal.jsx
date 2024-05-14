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
import { deleteOrder } from "../../services/orderService";
import { useTranslation } from "../../features/LanguageContext";

function OrderDeleteModal({ id, isOpen, onClose, getOrders }) {
  const toast = useToast();
  const translations = useTranslation();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteOrder(id);
    if (resp.status === 200) {
      toast({
        title: "Order deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getOrders();
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.orderDelete}</ModalHeader>
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

export default OrderDeleteModal;
