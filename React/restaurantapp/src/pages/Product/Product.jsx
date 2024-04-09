import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TableContainer, Table, Thead, Tbody, Th, Td, Tr, Heading, useDisclosure, Box,
  Button} from "@chakra-ui/react";
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
import ProductAddModal from "../../components/product/ProductAddModal";
import { getAllProducts } from "../../services/productService";
import ProductDeleteModal from "../../components/product/ProductDeleteModal";
import ProductEditModal from "../../components/product/ProductEditModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Product() {
  const [products, setProducts] = useState([]);
  const [itemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 8);

const fetchProducts = useCallback(async () => {
    const { data: { items, totalCount }} = await getAllProducts(currentPage, itemsPerPage);
    setProducts(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProducts();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchProducts]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  const openEditModal = (id) => setEditProductId(id);
  const closeEditModal = () => setEditProductId(null);

  const openDeleteModal = (id) => setDeleteProductId(id);
  const closeDeleteModal = () => setDeleteProductId(null);

  return (
    <TableContainer width='100%'>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 15px" }}>
        <Heading>Product List</Heading>
        <ProductAddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} getProducts={fetchProducts}/> 
      </div>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>CategoryName</Th>
            <Th>Photo</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.length === 0 ? (<Tr><Td>Products not found</Td></Tr>) : (products.map((product)=>(
            <Tr key={product.id}>
            <Td>{product.id}</Td>
            <Td>{product.name}</Td>
            <Td>{product.price}</Td>
            <Td>{product.categoryName}</Td>
            <Td><img src={`${process.env.REACT_APP_API_BASE_URL}${product.imageUrl}`} alt={product.name} width='65px' height='60px'/></Td>
            <Td display="flex" gap="10px" justifyContent="center" padding='18px'>
              <EditIcon onClick={()=>openEditModal(product.id)} fontSize="18px" color="orange" style={{ cursor: "pointer" }} />
              <ProductEditModal id={product.id}
                                  isOpen={editProductId === product.id}
                                  onClose={closeEditModal}
                                  getProducts={fetchProducts}/>
              <DeleteIcon onClick={()=>openDeleteModal(product.id)} fontSize="18px" color="red" style={{ cursor: "pointer" }} />
              <ProductDeleteModal id={product.id}
                                  isOpen={deleteProductId === product.id}
                                  onClose={closeDeleteModal}
                                  getProducts={fetchProducts}/>
            </Td>
          </Tr>
          )))}
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

export default Product;
