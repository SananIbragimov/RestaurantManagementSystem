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
  Flex,
  Input,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getAllReports, getTotalSales } from "../../services/reportService";
import ReportDeleteModal from "../../components/report/ReportDeleteModal";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Report() {
  const [reports, setReports] = useState([]);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteReportId, setDeleteReportId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalSales, setTotalSales] = useState(null);
  const toast = useToast();

  const translations = useTranslation();

  const fetchTotalSales = async () => {
    try {
      const { data } = await getTotalSales(startDate, endDate);
      setTotalSales(data.totalSales);
      console.log("Total sales set to:", data.total);
    } catch (error) {
      console.error("Failed to fetch total sales", error);
      toast({
        title: "Failed to fetch total sales",
        description: "Please check the dates and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openDeleteModal = (id) => setDeleteReportId(id);
  const closeDeleteModal = () => setDeleteReportId(null);

  const fetchReports = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllReports(currentPage, itemsPerPage);
    setReports(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchReports();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchReports]);

  const totalPage = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`, { replace: true });
  };

  return (
    <Table>
      <TableContainer width="100%">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 15px",
          }}
        >
          <Heading>{translations.reportList}</Heading>
        </div>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>{translations.title}</Th>
              <Th>{translations.createDate}</Th>
              <Th>{translations.data}</Th>
              <Th display="flex" justifyContent="center">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.length === 0 ? (
              <Tr>
                <Td style={{ color: "red", fontSize: "20px" }}>
                  Reports not found.
                </Td>
              </Tr>
            ) : (
              reports.map((report) => {
                let parsedData;
                try {
                  parsedData = JSON.parse(report.data);
                } catch (error) {
                  console.error("Error parsing JSON data", error);
                  parsedData = { total: "Error" };
                }

                return (
                  <Tr key={report.id}>
                    <Td>{report.id}</Td>
                    <Td>{report.title}</Td>
                    <Td>{report.createdDate}</Td>
                    <Td>₼{parsedData.total}</Td>
                    <Td display="flex" gap="10px" justifyContent="center">
                      <DeleteIcon
                        onClick={() => openDeleteModal(report.id)}
                        fontSize="18px"
                        color="red"
                        style={{ cursor: "pointer" }}
                      />
                      <ReportDeleteModal
                        id={report.id}
                        isOpen={deleteReportId === report.id}
                        onClose={closeDeleteModal}
                        getReports={fetchReports}
                      />
                    </Td>
                  </Tr>
                );
              })
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
      <Divider />
      <Flex direction="column" width="100%" p="5">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <Input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <Button onClick={fetchTotalSales} colorScheme="blue" ml="2">
              {translations.totalSales}
            </Button>
          </Box>
          {totalSales !== null && (
            <Box>
              <Heading size="md">
                {translations.totalSales}: ₼{totalSales}
              </Heading>
            </Box>
          )}
        </Flex>
      </Flex>
    </Table>
  );
}

export default Report;
