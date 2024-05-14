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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { getAllReservations } from "../../services/reservationService";
import ReservationAddModal from "../../components/reservation/ReservationAddModal";
import ReservationEditModal from "../../components/reservation/ReservationEditModal";
import ReservationDeleteModal from "../../components/reservation/ReservationDeleteModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editReservationId, setEditReservationId] = useState(null);
  const [deleteReservationId, setDeleteReservationId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);

  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const fetchReservations = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllReservations(currentPage, itemsPerPage);
    console.log(items);
    setReservations(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchReservations();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchReservations]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  const openEditModal = (id) => setEditReservationId(id);
  const closeEditModal = () => setEditReservationId(null);

  const openDeleteModal = (id) => setDeleteReservationId(id);
  const closeDeleteModal = () => setDeleteReservationId(null);

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
        <Heading>{translations.reserveList}</Heading>
        {(role === "Admin" || role === "SuperAdmin") && (
          <ReservationAddModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            getReservations={fetchReservations}
          />
        )}
      </div>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>{translations.table}</Th>
            <Th>{translations.reserveTime}</Th>
            <Th>{translations.firstName}</Th>
            <Th>{translations.phoneNumber}</Th>
            {(role === "Admin" || role === "SuperAdmin") && <Th>Action</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {reservations.length === 0 ? (
            <Tr>
              <Td style={{ color: "red", fontSize: "20px" }}>
                Reservations not found
              </Td>
            </Tr>
          ) : (
            reservations.map((reservation, index) => (
              <Tr key={reservation.id}>
                <Td>{index + 1}</Td>
                <Td>{reservation.table.name}</Td>
                <Td>{reservation.reservationTime}</Td>
                <Td>{reservation.customerName}</Td>
                <Td>{reservation.customerPhone}</Td>
                {(role === "Admin" || role === "SuperAdmin") && (
                  <Td
                    display="flex"
                    gap="10px"
                    justifyContent="center"
                    padding="18px"
                  >
                    <EditIcon
                      onClick={() => openEditModal(reservation.id)}
                      fontSize="18px"
                      color="orange"
                      style={{ cursor: "pointer" }}
                    />
                    <ReservationEditModal
                      id={reservation.id}
                      isOpen={editReservationId === reservation.id}
                      onClose={closeEditModal}
                      getReservations={fetchReservations}
                    />
                    <DeleteIcon
                      onClick={() => openDeleteModal(reservation.id)}
                      fontSize="18px"
                      color="red"
                      style={{ cursor: "pointer" }}
                    />
                    <ReservationDeleteModal
                      id={reservation.id}
                      isOpen={deleteReservationId === reservation.id}
                      onClose={closeDeleteModal}
                      getReservations={fetchReservations}
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

export default Reservation;
