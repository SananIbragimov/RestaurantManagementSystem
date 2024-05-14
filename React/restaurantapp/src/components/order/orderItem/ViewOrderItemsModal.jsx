import React, { useState, useEffect } from "react";
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
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import OrderItemDeleteModal from "./OrderItemDeleteModal";
import OrderItemEditModal from "./OrderItemEditModal";
import { getAllOrderItemsByOrderId } from "../../../services/orderService";
import InvoiceModal from "./InvoiceModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../../features/LanguageContext";

const ViewOrderItemsModal = ({ isOpen, onClose, orderId, getOrders }) => {
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEditOpen = (itemId) => {
    setSelectedOrderItemId(itemId);
    onEditOpen();
  };

  const handleDeleteOpen = (itemId) => {
    setSelectedOrderItemId(itemId);
    onDeleteOpen();
  };

  const fetchOrderItems = async () => {
    try {
      const response = await getAllOrderItemsByOrderId(orderId);
      setOrderItems(response.data);
      getOrders();
    } catch (error) {
      console.error("Order items fetching failed:", error);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchOrderItems = async () => {
      try {
        const response = await getAllOrderItemsByOrderId(orderId);
        if (!isCancelled) {
          setOrderItems(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderItems();

    return () => {
      isCancelled = true;
    };
  }, [orderId]);

  const totalOrderPrice = orderItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent width="full">
          <ModalHeader>{translations.orderItems}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>{translations.productName}</Th>
                    <Th>{translations.quantity}</Th>
                    <Th>{translations.price}</Th>
                    {(role === "Admin" || role === "SuperAdmin") && (
                      <Th>Action</Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {orderItems.map((orderItem) => (
                    <Tr key={orderItem.id}>
                      <Td>
                        {orderItem.product
                          ? `${orderItem.product.name} (₼${orderItem.price})`
                          : "Product info unavailable"}
                      </Td>
                      <Td>{orderItem.quantity}</Td>
                      <Td>₼{orderItem.totalPrice}</Td>
                      {(role === "Admin" || role === "SuperAdmin") && (
                        <Td>
                          <Flex
                            justifyContent="flex-end"
                            gap="5px"
                            alignItems="center"
                            height="100% !important"
                          >
                            <EditIcon
                              onClick={() => handleEditOpen(orderItem.id)}
                              color="orange"
                              fontSize="1xl"
                              cursor="pointer"
                            />
                            <DeleteIcon
                              onClick={() => handleDeleteOpen(orderItem.id)}
                              color="#ec2626"
                              fontSize="1xl"
                              cursor="pointer"
                            />
                          </Flex>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
                <OrderItemEditModal
                  id={selectedOrderItemId}
                  isOpen={isEditOpen}
                  onClose={onEditClose}
                  getOrderItems={fetchOrderItems}
                />
                <OrderItemDeleteModal
                  id={selectedOrderItemId}
                  isOpen={isDeleteOpen}
                  onClose={onDeleteClose}
                  getOrderItems={fetchOrderItems}
                />
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
            {(role === "Admin" || role === "SuperAdmin") && (
              <Button
                colorScheme="blue"
                onClick={() => setShowInvoiceModal(true)}
              >
                {translations.showInvoice}
              </Button>
            )}
            <Button onClick={onClose}>{translations.close}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {showInvoiceModal && (
        <InvoiceModal
          isOpen={showInvoiceModal}
          onClose={handleCloseInvoiceModal}
          orderItems={orderItems}
          totalOrderPrice={totalOrderPrice}
        />
      )}
    </>
  );
};

export default ViewOrderItemsModal;
