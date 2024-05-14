import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrders } from "../../services/orderService";
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import OrderAddModal from "../../components/order/OrderAddModal";
import OrderCard from "../../components/order/OrderCard";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Order() {
  const [orders, setOrders] = useState([]);
  const [itemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);

  const fetchOrders = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllOrders(currentPage, itemsPerPage);
    setOrders(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchOrders();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchOrders]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  return (
    <section style={{ width: "88%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 36px",
        }}
      >
        <Heading>{translations.orderList}</Heading>
        {(role === "Admin" || role === "SuperAdmin") && (
          <OrderAddModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            getOrders={fetchOrders}
          />
        )}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "5px",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              tableId={order.tableId}
              appUserId={order.appUserId}
              getOrders={fetchOrders}
            />
          ))
        ) : (
          <Text color="red" fontSize="20px">
            Order list is empty.
          </Text>
        )}
      </div>
      <Box display="flex" justifyContent="center" mt="20">
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
    </section>
  );
}

export default Order;
