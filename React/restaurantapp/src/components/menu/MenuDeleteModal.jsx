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
import { deleteMenu } from "../../services/menuService";

function MenuDeleteModal({id, isOpen, onClose, getMenus}) {
  const toast = useToast();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteMenu(id);
    if (resp.status === 200) {
      toast({
        title: "Menu deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getMenus();
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete menu</ModalHeader>
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

export default MenuDeleteModal;
