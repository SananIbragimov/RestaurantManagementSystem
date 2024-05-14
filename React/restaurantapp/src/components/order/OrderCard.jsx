import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Flex,
  Divider,
  Heading,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import OrderDeleteModal from "./OrderDeleteModal";
import OrderEditModal from "./OrderEditModal";
import OrderItemAddModal from "./orderItem/OrderItemAddModal";
import ViewOrderItemsModal from "./orderItem/ViewOrderItemsModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function OrderCard({ id, tableId, appUserId, getOrders }) {
  const [isAddOrderItemOpen, setIsAddOrderItemOpen] = useState(false);
  const [isViewOrderItemsOpen, setIsViewOrderItemsOpen] = useState(false);

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

  return (
    <>
      {isEditOpen && (
        <OrderEditModal
          getOrders={getOrders}
          id={id}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
      {isDeleteOpen && (
        <OrderDeleteModal
          getOrders={getOrders}
          id={id}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
      )}
      <Card minW="20%">
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
        <CardBody backgroundColor="#a9c5e6">
          <Stack spacing="3">
            <Heading size="md" textColor="#222f3e" fontWeight="bold">
              {translations.orders}
            </Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter
          backgroundColor="lightgray"
          height="8vh"
          display="flex"
          alignItems="center"
        >
          <ButtonGroup
            width="full"
            display="flex"
            justifyContent="space-between"
          >
            <Button
              onClick={() => setIsAddOrderItemOpen(true)}
              variant="solid"
              colorScheme="blue"
              padding="2px 10px"
            >
              {translations.addItem}
            </Button>
            <Button
              onClick={() => setIsViewOrderItemsOpen(true)}
              variant="solid"
              colorScheme="green"
              padding="2px 10px"
            >
              <ViewIcon />
            </Button>
          </ButtonGroup>
        </CardFooter>
        {isAddOrderItemOpen && (
          <OrderItemAddModal
            isOpen={isAddOrderItemOpen}
            onClose={() => setIsAddOrderItemOpen(false)}
            orderId={id}
            getOrders={getOrders}
          />
        )}
        {isViewOrderItemsOpen && (
          <ViewOrderItemsModal
            isOpen={isViewOrderItemsOpen}
            onClose={() => setIsViewOrderItemsOpen(false)}
            orderId={id}
            getOrders={getOrders}
          />
        )}
      </Card>
    </>
  );
}

export default OrderCard;
