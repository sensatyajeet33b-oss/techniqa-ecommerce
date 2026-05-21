import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, Dashboard } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from "../assets/logo.png";

export default function Sidebar({ isOpen }) {

  const location = useLocation();
  const [openSettings, setOpenSettings] = useState(false);

  const menuItemStyle = (active) => ({
    mx: 1,
    mb: 0.5,
    borderRadius: "8px",
    minHeight: 45,
    backgroundColor: active ? "#2563eb" : "transparent",
    "&:hover": {
      backgroundColor: "#1e3a8a",
    },
  });

  const subMenuStyle = (active) => ({
    pl: 4,
    mx: 1,
    mb: 0.5,
    borderRadius: "8px",
    minHeight: 40,
    backgroundColor: active ? "#2563eb" : "transparent",
    color: "#cbd5f5",
    "&:hover": {
      backgroundColor: "#1e40af",
    },
  });

  const drawerWidth = isOpen ? 220 : 70;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          background: "#0b1a4a",
          color: "#fff",
          transition: "width 0.3s ease",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: isOpen ? "100%" : 40,
            maxWidth: "180px",
            height: "auto",
            objectFit: "contain",
            transition: "0.3s",
          }}
        />
      </Box>

      {/* Title */}
      {isOpen && (
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            py: 2,
            fontWeight: "bold",
            letterSpacing: 1,
            color: "#fff",
          }}
        >
          Admin Panel
        </Typography>
      )}

      <List>
        {/* Dashboard */}
        <ListItemButton
          component={Link}
          to="/admin/dashboard"
          sx={menuItemStyle(location.pathname.includes("dashboard"))}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
            <Dashboard />
          </ListItemIcon>

          {isOpen && <ListItemText primary="Dashboard" />}
        </ListItemButton>

        {/* CATEGORY */}
        <ListItemButton
          component={Link}
          to="/admin/category"
          sx={menuItemStyle(location.pathname.includes("category"))}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
            <CategoryIcon />
          </ListItemIcon>

          {isOpen && <ListItemText primary="Category" />}
        </ListItemButton>

        {/* PRODUCTS */}
        <ListItemButton
          component={Link}
          to="/admin/products"
          sx={menuItemStyle(location.pathname.includes("products"))}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
            <InventoryIcon />
          </ListItemIcon>

          {isOpen && <ListItemText primary="Products" />}
        </ListItemButton>

        {/* SETTINGS */}
        <ListItemButton
          onClick={() => setOpenSettings(!openSettings)}
          sx={menuItemStyle(false)}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>

          {isOpen && <ListItemText primary="Settings" />}

          {isOpen &&
            (openSettings ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        <Collapse in={openSettings && isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/user"
              sx={subMenuStyle(location.pathname.includes("user"))}
            >
              <ListItemIcon sx={{ color: "#cbd5f5", minWidth: 35 }}>
                <ManageAccountsIcon />
              </ListItemIcon>

              <ListItemText primary="User" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}