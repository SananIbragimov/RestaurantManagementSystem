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

function CategoryDeleteModal({id, isOpen, onClose, getCategories}) {
  const toast = useToast();

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
          <ModalHeader>Delete category</ModalHeader>
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

export default CategoryDeleteModal;
