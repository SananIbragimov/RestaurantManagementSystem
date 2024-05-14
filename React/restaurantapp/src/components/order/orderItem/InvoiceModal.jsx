import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tr,
  Th,
  Tfoot,
  Td,
  Thead,
  Tbody,
  Table,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { postReport } from "../../../services/reportService";
import { useTranslation } from "../../../features/LanguageContext";

function InvoiceModal({ isOpen, onClose, orderItems, totalOrderPrice }) {
  const toast = useToast();
  const translations = useTranslation();

  const createReport = async () => {
    const reportData = {
      title: "Daily Sales Report",
      description: "Report generated for daily sales.",
      reportType: 1,
      data: JSON.stringify({
        orderItems: orderItems.map((item) => ({
          name: item.product ? item.product.name : "Unknown",
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
        })),
        total: totalOrderPrice,
      }),
    };

    try {
      const response = await postReport(reportData);
      if (response.status === 201) {
        toast({
          title: "Report created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        console.error("Failed to create report");
      }
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{translations.invoiceDetail}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>{translations.productName}</Th>
                  <Th>{translations.quantity}</Th>
                  <Th>{translations.price}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderItems.map((orderItem, index) => (
                  <Tr key={index}>
                    <Td>
                      {orderItem.product ? orderItem.product.name : "N/A"}
                    </Td>
                    <Td>{orderItem.quantity}</Td>
                    <Td>₼{orderItem.totalPrice}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{translations.total}:</Th>
                  <Td fontWeight="bolder">₼{totalOrderPrice}</Td>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={createReport}>
            {translations.invoiceReport}
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            {translations.close}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InvoiceModal;
