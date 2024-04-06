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
  useDisclosure,
  Box,
  Button
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { getAllCategories } from "../../services/categoryService";
import CategoryAddModal from "../../components/category/CategoryAddModal";
import CategoryEditModal from "../../components/category/CategoryEditModal";
import CategoryDeleteModal from "../../components/category/CategoryDeleteModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Category() {
  const [categories, setCategories] = useState([]);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);

  const openEditModal = (id) => setEditCategoryId(id);
  const closeEditModal = () => setEditCategoryId(null);

  const openDeleteModal = (id) => setDeleteCategoryId(id);
  const closeDeleteModal = () => setDeleteCategoryId(null);

  const fetchCategories = useCallback(async () => {
    const { data: { items, totalCount }} = await getAllCategories(currentPage, itemsPerPage);
    setCategories(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCategories();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchCategories]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  return (
    <TableContainer width="100%">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 15px" }}>
        <Heading>Category List</Heading>
        <CategoryAddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} getCategories={fetchCategories} />
      </div>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th display="flex" justifyContent="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.length === 0 ? (
            <Tr>
              <Td>Categories not found.</Td>
            </Tr>
          ) : (
            categories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.id}</Td>
                <Td>{category.name}</Td>
                <Td display="flex" gap="10px" justifyContent="center">
                  <EditIcon onClick={() => openEditModal(category.id)} fontSize="18px" color="orange" style={{ cursor: "pointer" }} />
                  <CategoryEditModal id={category.id}
                                      isOpen={editCategoryId === category.id}
                                      onClose={closeEditModal}
                                      getCategories={fetchCategories}/>
                  <DeleteIcon onClick={() => openDeleteModal(category.id)} fontSize="18px" color="red" style={{ cursor: "pointer" }} />
                  <CategoryDeleteModal id={category.id}
                                        isOpen={deleteCategoryId === category.id}
                                        onClose={closeDeleteModal}
                                        getCategories={fetchCategories}/>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="center" mt="4">
        {[...Array(totalPage)].map((_, i) => (
          <Button key={i} mx="1" colorScheme={currentPage === i + 1 ? "teal" : "gray"} onClick={() => handlePageChange(i+1)}>
            {i + 1}
          </Button>
        ))}
      </Box>
    </TableContainer>
  );
}

export default Category;