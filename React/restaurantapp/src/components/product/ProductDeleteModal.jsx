import React from 'react'
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
import { deleteProduct } from '../../services/productService';

function ProductDeleteModal({id, isOpen, onClose, getProducts}) {
    const toast = useToast();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteProduct(id);
    if (resp.status === 200) {
      toast({
        title: "Product deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getProducts();
    }
  };

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
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
  )
}

export default ProductDeleteModal