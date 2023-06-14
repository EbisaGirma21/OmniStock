import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dashboard, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TogglePovider from "../context/SidebarContext";
import SellIcon from "@mui/icons-material/Sell";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MoveDownIcon from "@mui/icons-material/MoveDown";

const extended = 260;
const collapse = 70;
function SideBar() {
  const {
    isSidebarOpen,
    isDrawerHover,
    isHover,
    handleMouseEnter,
    handleMouseLeave,
  } = useContext(TogglePovider);

  const [menuItems] = useState(() => getMenuItems());
  function getMenuItems() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "admin" || user.role === "super") {
      return [
        {
          text: "Dashboard",
          icon: <Dashboard color="primary" />,
          path: "/dashboard",
        },
        {
          text: "Store",
          icon: <Store color="primary" />,
          path: "store",
        },
        {
          text: "Product Catagory",
          icon: <Store color="primary" />,
          path: "productCatagory",
        },
        {
          text: "Users",
          icon: <SupervisedUserCircleIcon color="primary" />,
          path: "user",
        },
        {
          text: "Sells",
          icon: <SellIcon color="primary" />,
          path: "sell",
        },
        {
          text: "Purchases",
          icon: <MoveDownIcon color="primary" />,
          path: "purchase",
        },
        {
          text: "Transfer",
          icon: <ImportExportIcon color="primary" />,
          path: "transfer",
        },
      ];
    } else {
      return [
        {
          text: "Dashboard",
          icon: <Dashboard color="primary" />,
          path: "/dashboard",
        },
        {
          text: "Product Catagory",
          icon: <Store color="primary" />,
          path: "productCatagory",
        },
        {
          text: "Sells",
          icon: <SellIcon color="primary" />,
          path: "sell",
        },
        {
          text: "Purchases",
          icon: <MoveDownIcon color="primary" />,
          path: "purchase",
        },
      ];
    }
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isSidebarOpen || isHover ? extended : collapse,
          transition: "0.5s",
        },
      }}
    >
      <Box
        className="flex items-center justify-center"
        style={{
          marginBottom: isSidebarOpen || isDrawerHover ? 5 : 19,
          marginTop: isSidebarOpen || isDrawerHover ? 18 : 13,
          height: "47px",
        }}
      >
        <LocalGroceryStoreOutlinedIcon className="w-8 h-8 mr-1" />
        <Typography
          variant="h4"
          sx={{
            display: isSidebarOpen || isDrawerHover ? "block" : "none",
            cursor: "pointer",
          }}
        >
          <Link to="/dashboard">PStore</Link>
        </Typography>
      </Box>
      <Divider />

      {/* list of admin page */}
      <List>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.text}
            className="flex  justify-center items-center"
          >
            <ListItemButton>
              <ListItemIcon className="ml-1">{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "&:hover": {
                    color: "#4454C3",
                  },
                  display: isSidebarOpen || isDrawerHover ? "block" : "none",
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
