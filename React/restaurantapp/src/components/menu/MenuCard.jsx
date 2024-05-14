import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Flex,
  Divider,
  Text,
  Heading,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import MenuDeleteModal from "./MenuDeleteModal";
import MenuEditModal from "./MenuEditModal";
import MenuItemAddModal from "./menuItem/MenuItemAddModal";
import ViewItemsModal from "./menuItem/ViewItemsModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function MenuCard({ id, name, sdate, edate, price, getMenus }) {
  const [utcSDate, setUtcSDate] = useState(null);
  const [utcEDate, setUtcEDate] = useState(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isViewItemsOpen, setIsViewItemsOpen] = useState(false);

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

  useEffect(() => {
    const startDate = new Date(sdate);
    const offsetSDate = startDate.getTimezoneOffset();
    const convertedSDate = new Date(startDate.getTime() - offsetSDate * 60000);
    const formattedUtcSDate = format(convertedSDate, "dd-MM-yyyy HH:mm");
    setUtcSDate(formattedUtcSDate);

    if (edate) {
      const endDate = new Date(edate);
      const offsetEDate = endDate.getTimezoneOffset();
      const convertedEDate = new Date(endDate.getTime() - offsetEDate * 60000);
      const formattedUtcEDate = format(convertedEDate, "dd-MM-yyyy HH:mm");
      setUtcEDate(formattedUtcEDate);
    } else {
      setUtcEDate("N/A");
    }
  }, [sdate, edate]);

  return (
    <>
      {isEditOpen && (
        <MenuEditModal
          getMenus={getMenus}
          id={id}
          isOpen={isEditOpen}
          onClose={onEditClose}
        />
      )}
      {isDeleteOpen && (
        <MenuDeleteModal
          getMenus={getMenus}
          id={id}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
        />
      )}
      <Card maxW="25%">
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
              {name}
            </Heading>
            <Text textColor="#222f3e" fontSize="1xl">
              <b>{translations.startDate}:</b> {utcSDate}
            </Text>
            <Text textColor="#222f3e" fontSize="1xl">
              <b>{translations.endDate}:</b> {utcEDate}
            </Text>
            <Text textColor="#C84C37" fontSize="2xl">
              ₼{price}
            </Text>
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
            {(role === "Admin" || role === "SuperAdmin") && (
              <Button
                onClick={() => setIsAddItemOpen(true)}
                variant="solid"
                colorScheme="blue"
                padding="2px 10px"
              >
                {translations.addItem}
              </Button>
            )}
            <Button
              onClick={() => setIsViewItemsOpen(true)}
              variant="solid"
              colorScheme="green"
              padding="2px 10px"
            >
              <ViewIcon />
            </Button>
          </ButtonGroup>
        </CardFooter>
        {isAddItemOpen && (
          <MenuItemAddModal
            isOpen={isAddItemOpen}
            onClose={() => setIsAddItemOpen(false)}
            menuId={id}
            getMenus={getMenus}
          />
        )}
        {isViewItemsOpen && (
          <ViewItemsModal
            isOpen={isViewItemsOpen}
            onClose={() => setIsViewItemsOpen(false)}
            menuId={id}
            getMenus={getMenus}
          />
        )}
      </Card>
    </>
  );
}

export default MenuCard;
