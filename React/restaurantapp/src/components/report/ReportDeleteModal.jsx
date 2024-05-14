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
import { deleteReport } from "../../services/reportService";
import { useTranslation } from "../../features/LanguageContext";

function ReportDeleteModal({ id, isOpen, onClose, getReports }) {
  const toast = useToast();
  const translations = useTranslation();

  const handleDeleteBtnClick = async () => {
    let resp = await deleteReport(id);
    if (resp.status === 200) {
      toast({
        title: "Report deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getReports();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{translations.reportDelete}</ModalHeader>
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

export default ReportDeleteModal;
