// OrderModal.js
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import OrderCard from "./OrderCard";
import OrderAddModal from "./OrderAddModal";
import { getTable } from "../../services/tableService";
import { useTranslation } from "../../features/LanguageContext";

const OrderModal = ({ isOpen, onClose, id, name, updateTableStatus }) => {
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState();
  const translations = useTranslation();

  const fetchOrders = useCallback(async () => {
    const response = await getTable(id);
    setOrders(response.data.orders);

    const isStillReserved =
      response.data.isReserved &&
      new Date(response.data.reservationTime) > new Date();
    updateTableStatus(isStillReserved, response.data.orders.length > 0);
  }, [id, updateTableStatus]);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen, fetchOrders]);

  const handleClose = () => {
    onClose();
    fetchOrders();
  };

  const handleOpenAddModal = () => {
    if (orders.length === 0) {
      setShowAddModal(true);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    fetchOrders();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {translations.orders}: {name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {orders.length === 0 && (
            <Button onClick={handleOpenAddModal} colorScheme="blue">
              {translations.newOrder}
            </Button>
          )}
          {showAddModal ? (
            <OrderAddModal
              isOpen={showAddModal}
              onClose={handleCloseAddModal}
              getOrders={fetchOrders}
            />
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                tableId={id}
                {...order}
                getOrders={fetchOrders}
              />
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
