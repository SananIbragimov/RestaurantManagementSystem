import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Divider,
  Box,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import TableDeleteModal from "./TableDeleteModal";
import TableEditModal from "./TableEditModal";
import OrderModal from "../order/OrderModal";
import { getTable } from "../../services/tableService";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

const statusMapping = {
  Available: { color: "#2ecc71" },
  Reserved: { color: "#f1c40f" },
  Occupied: { color: "#e74c3c" },
};

function TableCard({
  id,
  name,
  isReserved,
  reservationTime,
  initialTableStatus,
  getTables,
}) {
  const [tableStatus, setTableStatus] = useState(initialTableStatus);
  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const backgroundColor = statusMapping[tableStatus]
    ? statusMapping[tableStatus]?.color
    : "#a9c5e6";

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

  const {
    isOpen: isOrderModalOpen,
    onOpen: onOrderModalOpen,
    onClose: onOrderModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchInitialData = async () => {
      const tableInfo = await getTable(id);
      const hasOrders = tableInfo.data.orders.length > 0;
      const reservationDate = new Date(tableInfo.data.reservationTime);
      const now = new Date();

      let status;
      if (reservationDate < now && isReserved) {
        status = "Available";
      } else if (hasOrders) {
        status = "Occupied";
      } else if (isReserved) {
        status = "Reserved";
      } else {
        status = "Available";
      }

      setTableStatus(status);
    };

    fetchInitialData();
  }, [id, isReserved]);

  const updateTableStatus = useCallback(
    (isReserved, ordersExist) => {
      if (ordersExist) {
        setTableStatus("Occupied");
      } else if (isReserved) {
        setTableStatus("Reserved");
      } else {
        setTableStatus("Available");
      }
    },
    [setTableStatus]
  );

  return (
    <>
      {isEditOpen && (
        <TableEditModal
          getTables={getTables}
          id={id}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
      {isDeleteOpen && (
        <TableDeleteModal
          getTables={getTables}
          id={id}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
      )}
      {isOrderModalOpen && (
        <OrderModal
          id={id}
          name={name}
          isOpen={isOrderModalOpen}
          reservationTime={reservationTime}
          onClose={onOrderModalClose}
          updateTableStatus={updateTableStatus}
        />
      )}
      <Card minW="24%">
        <CardHeader
          backgroundColor="#222f3e"
          height="3vh !important"
          borderTopRadius="8px"
        >
          <Flex
            justifyContent="flex-end"
            gap="5px"
            alignItems="center"
            height="100% !important"
          >
            {(role === "Admin" || role === "SuperAdmin") && (
              <>
                <EditIcon
                  onClick={onEditOpen}
                  color="orange"
                  fontSize="1xl"
                  cursor="pointer"
                />
                <DeleteIcon
                  onClick={onDeleteOpen}
                  color="#ec2626"
                  fontSize="1xl"
                  cursor="pointer"
                />
              </>
            )}
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody width="full" backgroundColor={backgroundColor}>
          <Box p={5} textAlign="center" fontSize="28px" textColor="white">
            {name}
            {isReserved && (
              <Text fontSize="md">
                Reserved for {new Date(reservationTime).toLocaleString()}
              </Text>
            )}
          </Box>
        </CardBody>
        <Divider />
        <CardFooter
          backgroundColor="lightgray"
          height="8vh"
          display="flex"
          alignItems="center"
        >
          <Button
            colorScheme={tableStatus === "Available" ? "green" : "red"}
            onClick={onOrderModalOpen}
          >
            {tableStatus === "Available"
              ? translations.openTable
              : translations.closeTable}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default TableCard;
