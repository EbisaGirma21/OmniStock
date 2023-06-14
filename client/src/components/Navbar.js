import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TogglePovider from "../context/SidebarContext";
import { Logout } from "../context/Logout";
import { useNavigate } from "react-router-dom";
import { StorePageProvider } from "../context/CreateContext";

const drawerWidth = 240;
const collapse = 50;

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { toggleSidebar, isSidebarOpen } = useContext(TogglePovider);
  const { stores, setStores } = useContext(StorePageProvider);
  const { logout } = Logout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    user.store &&
      fetch(`http://localhost:4040/api/store/${user.store}`)
        .then((response) => response.json())
        .then((data) => setStores(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "70px",
        display: "flex",
        backgroundColor: "#E9EDF4",
        width: isSidebarOpen
          ? `calc(100% - ${drawerWidth}px)`
          : `calc(100% - ${collapse}px)`,
        transition: "0.5s",
      }}
    >
      <Toolbar>
        <IconButton
          disableRipple
          size="small"
          edge="start"
          aria-label="open drawer"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <MenuIcon
              className="w-12 h-9 mr-2"
              sx={{
                color: "#A1A9E1",
              }}
            />
          ) : (
            <CloseOutlinedIcon
              style={{
                color: "#A1A9E1",
              }}
              className="w-12 h-5 "
            />
          )}
        </IconButton>
        <Typography sx={{ color: "#576482" }}>
          {user.role !== "sm" ? "PStore" : stores.storeName}
        </Typography>

        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ color: "#000", padding: 3 }}>{user.email}</Box>
          <Button variant="outlined" onClick={handleClick}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
