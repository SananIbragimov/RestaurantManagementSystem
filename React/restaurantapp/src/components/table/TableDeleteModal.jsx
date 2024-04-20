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

function TableDeleteModal({id, isOpen, onClose, getTables}) {
  const toast = useToast();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteTable(id);
    if (resp.status === 200) {
      toast({
        title: "Table deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getTables();
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete table</ModalHeader>
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

export default TableDeleteModal;
