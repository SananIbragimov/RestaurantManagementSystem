import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllMenus } from "../../services/menuService";
import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import MenuCard from "../../components/menu/MenuCard";
import MenuAddModal from "../../components/menu/MenuAddModal";
import { useSelector } from "react-redux";
import { useTranslation } from "../../features/LanguageContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Menu() {
  const [menus, setMenus] = useState([]);
  const [itemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const { role } = useSelector((state) => state.account);
  const translations = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page") || "1", 10);

  const fetchMenus = useCallback(async () => {
    const {
      data: { items, totalCount },
    } = await getAllMenus(currentPage, itemsPerPage);
    setMenus(items);
    setTotalItems(totalCount);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchMenus();
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate, fetchMenus]);

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
        <Heading>{translations.menuList}</Heading>
        {(role === "Admin" || role === "SuperAdmin") && (
          <MenuAddModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            getMenus={fetchMenus}
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
        {menus.length > 0 ? (
          menus.map((menu) => (
            <MenuCard
              key={menu.id}
              name={menu.name}
              id={menu.id}
              sdate={menu.validFrom}
              edate={menu.validTo}
              price={menu.price}
              getMenus={fetchMenus}
            />
          ))
        ) : (
          <Text color="red" fontSize="20px">
            Menu list is empty.
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

export default Menu;
