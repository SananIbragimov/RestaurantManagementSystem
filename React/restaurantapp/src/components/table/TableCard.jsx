import React from "react";
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import TableDeleteModal from "./TableDeleteModal";
import TableEditModal from "./TableEditModal";

const statusMapping = {
  1: { text: "Available", color: "#2ecc71" },
  2: { text: "Reserved", color: "#f1c40f" },
  3: { text: "Occupied", color: "#e74c3c" },
};

function TableCard({id, name, isReserved, reservationTime, tableStatus, getTables }) {
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


  const backgroundColor = statusMapping[tableStatus] ? statusMapping[tableStatus].color : "#a9c5e6";

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
      <Card minW="24%" >
        <CardHeader backgroundColor="#222f3e" height='3vh !important' borderTopRadius='8px'>
          <Flex justifyContent="flex-end" gap='5px' alignItems='center' height='100% !important'>
              <EditIcon onClick={onEditOpen} color="orange" fontSize="1xl" cursor="pointer" />
              <DeleteIcon onClick={onDeleteOpen} color="#ec2626" fontSize="1xl" cursor="pointer" />
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
        <CardFooter backgroundColor="lightgray" height='8vh' display="flex"
            alignItems="center">
         
        </CardFooter>
        
      </Card>
    </>
  );
}

export default TableCard;
