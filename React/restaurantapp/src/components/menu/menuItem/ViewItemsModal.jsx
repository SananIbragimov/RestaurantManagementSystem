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
import { getAllMenuItemsByMenuId } from "../../../services/menuService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import MenuItemDeleteModal from "./MenuItemDeleteModal";
import MenuItemEditModal from "./MenuItemEditModal";

const ViewItemsModal = ({ isOpen, onClose, menuId, getMenus }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const totalPrice = menuItems.reduce(
    (sum, item) => sum + item.displayPrice,
    0
  );
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
    setSelectedItemId(itemId);
    onEditOpen();
  };

  const handleDeleteOpen = (itemId) => {
    setSelectedItemId(itemId);
    onDeleteOpen();
  };

  const fetchMenuItems = async () => {
    try {
      const response = await getAllMenuItemsByMenuId(menuId);
      setMenuItems(response.data);
      getMenus();
    } catch (error) {
      console.error("Menu items fetching failed:", error);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchMenuItems = async () => {
      try {
        const response = await getAllMenuItemsByMenuId(menuId);
        if (!isCancelled) {
          console.log(response.data);
          const uniqueItems = Array.from(
            new Set(response.data.map((a) => a.productId))
          ).map((productId) => {
            return response.data.find((a) => a.productId === productId);
          });
          setMenuItems(uniqueItems);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuItems();

    return () => {
      isCancelled = true;
    };
  }, [menuId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Menu Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {menuItems.map((menuItem) => (
                    <Tr key={menuItem.id}>
                      <Td>
                        {menuItem.product
                          ? menuItem.product.name
                          : "Product info unavailable"}
                      </Td>
                      <Td>{menuItem.displayPrice}</Td>
                      <Td>
                        <Flex
                          justifyContent="flex-end"
                          gap="5px"
                          alignItems="center"
                          height="100% !important"
                        >
                          <EditIcon
                            onClick={() => handleEditOpen(menuItem.id)}
                            color="orange"
                            fontSize="1xl"
                            cursor="pointer"
                          />
                          <DeleteIcon
                            onClick={() => handleDeleteOpen(menuItem.id)}
                            color="#ec2626"
                            fontSize="1xl"
                            cursor="pointer"
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <MenuItemEditModal
                  id={selectedItemId}
                  isOpen={isEditOpen}
                  onClose={onEditClose}
                  getMenuItems={fetchMenuItems}
                />
                <MenuItemDeleteModal
                  id={selectedItemId}
                  isOpen={isDeleteOpen}
                  onClose={onDeleteClose}
                  getMenuItems={fetchMenuItems}
                />
                <Tfoot>
                  <Tr>
                    <Th>Total</Th>
                    <Th>{totalPrice}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewItemsModal;
