import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import LinkIcon from "@mui/icons-material/Link";
import AdminAccessPopup from "./AdminAccessPopup";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import UpperManagementLoginPopup from "./UpperManagementLoginPopup";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CarIcon from "@mui/icons-material/DirectionsCar";
import AnalyticsIcon from "@mui/icons-material/Assessment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Dialog, List, ListItem, Typography } from "@mui/material";
import axios from "axios";

function Navbar({
  onAddTire,
  onSearchTire,
  onAdminAccess,
  isAdmin,
  isLoggedIn,
  onLoginLogout,
  onClassicCarOpen,
  onTireSalesOpen,
  onOrdersOpen,
  pendingOrdersCount,
}) {
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [managementAnchorEl, setManagementAnchorEl] = useState(null);
  const isManagementMenuOpen = Boolean(managementAnchorEl);
  const [upperManagementLoginOpen, setUpperManagementLoginOpen] =
    useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleUpperManagementClick = () => {
    setUpperManagementLoginOpen(true);
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const isManager = userRole === "manager";

  const handleAdminPopupOpen = () => {
    setAdminPopupOpen(true);
  };

  const handleAdminPopupClose = () => {
    setAdminPopupOpen(false);
  };

  const handleAdminAccessGranted = (isGranted) => {
    onAdminAccess(isGranted);
    setAdminPopupOpen(false);
  };

  const handleManagementMenuOpen = (event) => {
    setManagementAnchorEl(event.currentTarget);
  };

  const handleManagementMenuClose = () => {
    setManagementAnchorEl(null);
  };

  const logoUrl =
    "https://i.postimg.cc/MpCNtPX6/Whats-App-Image-2023-12-27-at-4-24-00-PM.jpg";
  const imageUploadUrl = "https://postimages.org/";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (option) => {
    setAnchorEl(null);
    if (option === "addTire" && isAdmin) {
      onAddTire();
    } else if (option === "uploadImage") {
      window.open(imageUploadUrl, "_blank");
    } else if (option === "adminAccess") {
      handleAdminPopupOpen();
    } else if (option === "upperManagement") {
      handleUpperManagementClick();
    }
  };

  // State and functions for most commonly sold tires dialog
  const [commonSoldTiresOpen, setCommonSoldTiresOpen] = useState(false);
  const [mostCommonTires, setMostCommonTires] = useState([]);

  const handleCommonSoldTiresOpen = async () => {
    try {
      const response = await axios.get(
        "https://hw-backend.onrender.com/api/tire-sales/most-common-sold"
      );
      setMostCommonTires(response.data);
      setCommonSoldTiresOpen(true);
    } catch (error) {
      console.error("Error fetching most commonly sold tires:", error);
    }
  };

  const handleCommonSoldTiresClose = () => {
    setCommonSoldTiresOpen(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            style={{ color: "orange" }}
            edge="start"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => handleMenuOptionClick("addTire")}
              disabled={!isAdmin}
            >
              <AddCircleIcon
                style={{
                  marginRight: "10px",
                  color: isAdmin ? "orange" : "grey",
                }}
              />
              Add Tire
            </MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("uploadImage")}>
              <LinkIcon style={{ marginRight: "10px", color: "orange" }} />
              Image Upload
            </MenuItem>
            <MenuItem onClick={onOrdersOpen} disabled={!isAdmin}>
              <ShoppingCartIcon
                style={{
                  marginRight: "10px",
                  color: isAdmin ? "orange" : "grey",
                }}
              />
              Orders
            </MenuItem>
            <MenuItem onClick={handleManagementMenuOpen}>
              <ListItemIcon>
                <ManageAccountsTwoToneIcon style={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary="Management" />
            </MenuItem>
            <MenuItem onClick={handleCommonSoldTiresOpen}>
              <ListItemIcon>
                <AnalyticsIcon style={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary="Most Commonly Sold Tires" />
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={managementAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isManagementMenuOpen}
            onClose={handleManagementMenuClose}
          >
            <MenuItem onClick={onClassicCarOpen} disabled={!isManager}>
              <ListItemIcon>
                <CarIcon style={{ color: isManager ? "orange" : "grey" }} />
              </ListItemIcon>
              <ListItemText primary="Classic Car Inventory" />
            </MenuItem>
            <MenuItem onClick={onTireSalesOpen} disabled={!isManager}>
              <ListItemIcon>
                <AnalyticsIcon
                  style={{ color: isManager ? "orange" : "grey" }}
                />
              </ListItemIcon>
              <ListItemText primary="Tire Sales Analytics" />
            </MenuItem>
          </Menu>
        </div>
        <img
          src={logoUrl}
          alt="Company Logo"
          style={{ maxHeight: "50px", minHeight: "20px" }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ color: "orange" }} onClick={onSearchTire}>
            <SearchIcon />
          </IconButton>
          <IconButton style={{ color: "orange" }} onClick={onLoginLogout}>
            {isLoggedIn ? <ExitToAppIcon /> : <AccountCircle />}
          </IconButton>
        </div>
      </Toolbar>
      <AdminAccessPopup
        open={adminPopupOpen}
        onClose={handleAdminPopupClose}
        onAdminAccessGranted={handleAdminAccessGranted}
      />
      <UpperManagementLoginPopup
        open={upperManagementLoginOpen}
        onClose={() => setUpperManagementLoginOpen(false)}
        onLoginSuccess={() => {
          /* logic to navigate to upper management page */
        }}
      />
      <Dialog
        open={commonSoldTiresOpen}
        onClose={handleCommonSoldTiresClose}
        PaperProps={{ style: { padding: "20px" } }}
      >
        <List>
          {mostCommonTires.map((tire, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      style={{ color: "orange", fontWeight: "bold" }}
                    >
                      Size:
                    </Typography>
                    <Typography
                      component="span"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {` ${tire._id}`}
                    </Typography>
                  </>
                }
                secondary={
                  <Typography
                    component="span"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    {`Sold Count: ${tire.count}`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </AppBar>
  );
}

export default Navbar;
