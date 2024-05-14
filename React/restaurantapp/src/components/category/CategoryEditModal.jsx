import React, { useCallback, useEffect, useState } from "react";
import { editCategory, getCategory } from "../../services/categoryService";
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
import { useTranslation } from "../../features/LanguageContext";

function CategoryEditModal({ id, isOpen, onClose, getCategories }) {
  const [input, setInput] = useState("");
  const toast = useToast();
  const translations = useTranslation();

  const handleSaveBtnClick = async () => {
    if (input.length < 2) return;
    const body = {
      name: input,
    };

    try {
      let resp = await editCategory(id, body);
      if (resp.status === 200) {
        toast({
          title: "Category updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getCategories();
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const getCategoryDetail = useCallback(async () => {
    try {
      let response = await getCategory(id);
      console.log(response);
      setInput(response.data.name || "");
    } catch (error) {
      console.error(error);
      setInput("");
    }
  }, [id]);

  useEffect(() => {
    if (!isOpen) return;
    getCategoryDetail();
  }, [id, isOpen, getCategoryDetail]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.categoryUpdate}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{translations.categoryName}</FormLabel>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value.trim())}
                placeholder="Enter name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSaveBtnClick} colorScheme="blue" mr={3}>
              {translations.modalSave}
            </Button>
            <Button onClick={onClose}>{translations.modalCancel}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CategoryEditModal;
