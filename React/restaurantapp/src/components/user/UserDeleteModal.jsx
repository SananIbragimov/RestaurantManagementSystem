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
import { deleteUser } from "../../services/userService";

function UserDeleteModal({id, isOpen, onClose, getUsers}) {
  const toast = useToast();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteUser(id);
    if (resp.status === 200) {
      toast({
        title: "User deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getUsers();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>
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

export default UserDeleteModal;
