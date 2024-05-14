import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Heading,
  useDisclosure,
  Box,
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ProductAddModal from "../../components/product/ProductAddModal";
import {
  getAllProducts,
  getProductByPrice,
} from "../../services/productService";
import ProductDeleteModal from "../../components/product/ProductDeleteModal";
import ProductEditModal from "../../components/product/ProductEditModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Product() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [itemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);

  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const fetchProducts = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllProducts(currentPage, itemsPerPage);
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

  const handlePriceChange = (values) => {
    setPriceRange(values);
    navigate(`?page=1&minPrice=${values[0]}&maxPrice=${values[1]}`, {
      replace: true,
    });
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await getProductByPrice(
          priceRange[0],
          priceRange[1],
          currentPage,
          itemsPerPage
        );
        setProducts(response.data.items);
        setTotalItems(response.data.totalCount);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchFilteredProducts();
  }, [priceRange, currentPage, itemsPerPage]);

  return (
    <TableContainer width="100%">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 15px",
        }}
      >
        <Heading width="5%">{translations.productList}</Heading>
        <RangeSlider
          width="45%"
          defaultValue={[120, 240]}
          min={0}
          max={300}
          step={10}
          onChangeEnd={handlePriceChange}
        >
          <RangeSliderTrack bg="red.100">
            <RangeSliderFilledTrack bg="tomato" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
        {(role === "Admin" || role === "SuperAdmin") && (
          <ProductAddModal
            width="5%"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            getProducts={fetchProducts}
          />
        )}
      </div>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>{translations.productName}</Th>
            <Th>{translations.price}</Th>
            <Th>{translations.categoryName}</Th>
            <Th>{translations.photo}</Th>
            {(role === "Admin" || role === "SuperAdmin") && <Th>Action</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {products.length === 0 ? (
            <Tr>
              <Td style={{ color: "red", fontSize: "20px" }}>
                Products not found
              </Td>
            </Tr>
          ) : (
            products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.categoryName}</Td>
                <Td>
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${product.imageUrl}`}
                    alt={product.name}
                    width="65px"
                    height="60px"
                  />
                </Td>
                {(role === "Admin" || role === "SuperAdmin") && (
                  <Td
                    display="flex"
                    gap="10px"
                    justifyContent="center"
                    padding="18px"
                  >
                    <EditIcon
                      onClick={() => openEditModal(product.id)}
                      fontSize="18px"
                      color="orange"
                      style={{ cursor: "pointer" }}
                    />
                    <ProductEditModal
                      id={product.id}
                      isOpen={editProductId === product.id}
                      onClose={closeEditModal}
                      getProducts={fetchProducts}
                    />
                    <DeleteIcon
                      onClick={() => openDeleteModal(product.id)}
                      fontSize="18px"
                      color="red"
                      style={{ cursor: "pointer" }}
                    />
                    <ProductDeleteModal
                      id={product.id}
                      isOpen={deleteProductId === product.id}
                      onClose={closeDeleteModal}
                      getProducts={fetchProducts}
                    />
                  </Td>
                )}
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

export default Product;
