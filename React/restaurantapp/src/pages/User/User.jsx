import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { getAllUsers } from "../../services/userService";
import UserEditModal from "../../components/user/UserEditModal";
import UserDeleteModal from "../../components/user/UserDeleteModal";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function User() {
  const [users, setUsers] = useState([]);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);
  const translations = useTranslation();

  const openEditModal = (id) => setEditUserId(id);
  const closeEditModal = () => setEditUserId(null);

  const openDeleteModal = (id) => setDeleteUserId(id);
  const closeDeleteModal = () => setDeleteUserId(null);

  const fetchUsers = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllUsers(currentPage, itemsPerPage);
    setUsers(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchUsers();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchUsers]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  return (
    <TableContainer width="100%">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 15px",
        }}
      >
        <Heading>{translations.userList}</Heading>
      </div>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>{translations.firstName}</Th>
            <Th>{translations.lastName}</Th>
            <Th>{translations.phoneNumber}</Th>
            <Th>Email</Th>
            <Th>{translations.role}</Th>
            <Th display="flex" justifyContent="center">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length === 0 ? (
            <Tr>
              <Td>Users not found.</Td>
            </Tr>
          ) : (
            users.map((user, index) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.phoneNumber}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td display="flex" gap="10px" justifyContent="center">
                  {user.role !== "SuperAdmin" && (
                    <>
                      <EditIcon
                        onClick={() => openEditModal(user.id)}
                        fontSize="18px"
                        color="orange"
                        style={{ cursor: "pointer" }}
                      />
                      <DeleteIcon
                        onClick={() => openDeleteModal(user.id)}
                        fontSize="18px"
                        color="red"
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                  <UserEditModal
                    id={user.id}
                    isOpen={editUserId === user.id}
                    onClose={closeEditModal}
                    getUsers={fetchUsers}
                  />
                  <UserDeleteModal
                    id={user.id}
                    isOpen={deleteUserId === user.id}
                    onClose={closeDeleteModal}
                    getUsers={fetchUsers}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="center" mt="4">
        {[...Array(totalPage)].map((_, i) => (
          <Button
            key={i}
            mx="1"
            colorScheme={currentPage === i + 1 ? "teal" : "gray"}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
    </TableContainer>
  );
}

export default User;
