import React from 'react'
import { StyledLink, StyledNavbar } from './Navbar.styled'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const iconStyle = { color: "#c7ab59" }

  return (
    <StyledNavbar>
        <ul>
            <li><HomeIcon style={iconStyle} /><StyledLink to='/'> Home</StyledLink></li>
            <li><PersonIcon style={iconStyle} /><StyledLink to='/user'> Users</StyledLink></li>
            <li><TableRestaurantIcon style={iconStyle} /><StyledLink> Tables</StyledLink></li>
            <li><ReceiptLongIcon style={iconStyle} /><StyledLink> Orders</StyledLink></li>
            <li><RestaurantMenuIcon style={iconStyle} /><StyledLink> Menus</StyledLink></li>
            <li><CategoryIcon style={iconStyle} /><StyledLink to='/category'> Categories</StyledLink></li>
            <li><FastfoodIcon style={iconStyle} /><StyledLink to='/product'> Products</StyledLink></li>
            <li><ReportIcon style={iconStyle} /><StyledLink> Reports</StyledLink></li>
            <li><SettingsIcon style={iconStyle} /><StyledLink> Settings</StyledLink></li>
        </ul>
        <div>
            <img src="" alt="" />
            <LogoutIcon style={iconStyle} /><StyledLink> Logout</StyledLink>
        </div>
    </StyledNavbar>
  )
}

export default Navbar