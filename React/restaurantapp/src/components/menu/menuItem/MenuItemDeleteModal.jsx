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
import { deleteMenuItem } from "../../../services/menuService";

function MenuItemDeleteModal({id, isOpen, onClose, getMenuItems}) {
  const toast = useToast();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteMenuItem(id);
    if (resp.status === 200) {
      toast({
        title: "MenuItem deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      getMenuItems();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete menuitem</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading>Are you sure?</Heading>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleDeleteBtnClick} colorScheme="red" mr={3}>
              Yes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MenuItemDeleteModal;
