import React from "react";
import { StyledLink, StyledNavbar } from "./Navbar.styled";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import { Logout } from "../../features/account/Logout";
import { useTranslation } from "../../features/LanguageContext";

function Navbar() {
  const translations = useTranslation();
  const dispatch = useDispatch();
  const { userName, imageUrl } = useSelector((state) => state.account);
  const iconStyle = { color: "#dde0e6" };

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <StyledNavbar>
      <ul>
        <li>
          <HomeIcon style={iconStyle} />
          <StyledLink to="/"> {translations.navHome}</StyledLink>
        </li>
        <li>
          <PersonIcon style={iconStyle} />
          <StyledLink to="/user"> {translations.navUser}</StyledLink>
        </li>
        <li>
          <TableRestaurantIcon style={iconStyle} />
          <StyledLink to="/table"> {translations.navTable}</StyledLink>
        </li>
        <li>
          <ReceiptLongIcon style={iconStyle} />
          <StyledLink to="/order"> {translations.navOrder}</StyledLink>
        </li>
        <li>
          <EventSeatIcon style={iconStyle} />
          <StyledLink to="/reservation"> {translations.navReserve}</StyledLink>
        </li>
        <li>
          <RestaurantMenuIcon style={iconStyle} />
          <StyledLink to="/menu"> {translations.navMenu}</StyledLink>
        </li>
        <li>
          <CategoryIcon style={iconStyle} />
          <StyledLink to="/category"> {translations.navCategory}</StyledLink>
        </li>
        <li>
          <FastfoodIcon style={iconStyle} />
          <StyledLink to="/product"> {translations.navProduct}</StyledLink>
        </li>
        <li>
          <ReportIcon style={iconStyle} />
          <StyledLink to="/report"> {translations.navReport}</StyledLink>
        </li>
      </ul>
      <div>
        <h3>
          {translations.navHelloLogout}, {userName}
        </h3>
        <img src={`${process.env.REACT_APP_API_BASE_URL}${imageUrl}`} alt="" />
        <div direction="row" mt={2}>
          <LogoutIcon style={iconStyle} />
          <StyledLink onClick={handleLogout}>
            {" "}
            {translations.navLogout}
          </StyledLink>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
