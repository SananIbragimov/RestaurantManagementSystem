import React, { useCallback, useEffect, useState } from 'react';
import { getAllTables } from '../../services/tableService';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import TableAddModal from '../../components/table/TableAddModal';
import TableCard from '../../components/table/TableCard';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Table() {
    const [tables, setTables] = useState([]);
    const [itemsPerPage] = useState(8);
    const [totalItems, setTotalItems] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const query = useQuery();
    const navigate = useNavigate();
    const currentPage = parseInt(query.get("page") || "1", 8);

    const fetchTables = useCallback(async () => {
        const { data: { items, totalCount }} = await getAllTables(currentPage, itemsPerPage);
        setTables(items);
        setTotalItems(totalCount);
      }, [currentPage, itemsPerPage]);
    
      useEffect(() => {
        fetchTables();
        navigate(`?page=${currentPage}`, { replace: true });
      }, [currentPage, navigate, fetchTables]);
    
      const totalPage = Math.ceil(totalItems / itemsPerPage);
    
      const handlePageChange = (page) => {
        navigate(`?page=${page}`, { replace: true });
      };

  return (
    <section style= {{width:'88%'}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 36px" }}>
        <Heading>Table List</Heading>
        <TableAddModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} getTables={fetchTables} />
      </div>
      <div style={{ width: '100%', display: 'flex', gap: '5px', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
      {tables.map((table) => (
                <TableCard key={table.id} id={table.id} name={table.name} isReserved={table.isReserved} reservationTime={table.reservationTime} tableStatus={table.tableStatus} getTables={fetchTables}/>
              )
              
          )}
      </div>
        <Box display="flex" justifyContent="center" mt="20">
    {[...Array(totalPage)].map((_, i) => (
      <Button key={i} mx="1" colorScheme={currentPage === i + 1 ? "teal" : "gray"} onClick={() => handlePageChange(i+1)}>
        {i + 1}
      </Button>
    ))}
  </Box>
      </section>
  )
}

export default Table