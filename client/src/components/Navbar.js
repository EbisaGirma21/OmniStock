import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Link, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TogglePovider from "../context/SidebarContext";
import { Logout } from "../context/Logout";
import { useNavigate } from "react-router-dom";
import { StorePageProvider } from "../context/CreateContext";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import VariantsContext from "../context/VariantContext";
import RequestsContext from "../context/RequestContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const drawerWidth = 240;
const collapse = 50;

function NavBar() {
  // use state
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isNotification, setIsNotification] = useState(false);

  // from local Storage
  const user = JSON.parse(localStorage.getItem("user"));

  // from context Provider
  const { toggleSidebar, isSidebarOpen } = useContext(TogglePovider);
  const { stores, setStores } = useContext(StorePageProvider);
  const { logout } = Logout();
  const { variants, fetchVariants } = useContext(VariantsContext);
  const { requests, createRequest, updateRequest, fetchRequests } =
    useContext(RequestsContext);

  const isIconRef = useRef(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    user.store &&
      fetch(`http://localhost:4040/api/store/${user.store}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          Role: user.role,
        },
      })
        .then((response) => response.json())
        .then((data) => setStores(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fecth varint from database
  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fecth varint from database
  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // request under threshold and on progress
  const sentRequest = requests.filter((request) => {
    return (
      request.requestStatus === "Requested" ||
      request.requestStatus === "Pending"
    );
  });
  const approvedRequest = requests.filter((request) => {
    return request.requestStatus === "Approved" && request.store === user.store;
  });

  const requestAmount = requests.filter((request) => {
    return request.requestStatus === "Requested";
  });

  // variant under threshold
  const variantUnderThreshold = variants.filter((variant) => {
    return variant.amount < 10 && variant.store === user.store;
  });

  const badgeAmount = variantUnderThreshold.map((variant) => {
    if (sentRequest.some((request) => request.variantId === variant._id)) {
      return false;
    }
    return true;
  });

  var filteredBadgeAmount = badgeAmount.filter((amount) => {
    return amount === true;
  });

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const styledButton = {
    color: "#22c55e",
    background: "#bbf7d0",
    textTransform: "lowercase",
    borderRadius: "20px",
    fontSize: "14px",
    height: "28px",
    marginTop: "5px",
    boxShadow: "none",
    padding: "10px",
    "&:hover": {
      background: "#bbf7d0",
    },
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // setting request Is on view mode
  function storeRequestIdForOneMinute(requestId) {
    var key = "requestId";

    localStorage.setItem(key, requestId);

    setTimeout(function () {
      localStorage.removeItem(key);
    }, 30000); // 60000 milliseconds = 0.5 minute
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleLogoutClick();
          handleMenuClose();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // send request handler
  const handleSendRequest = (variant) => {
    createRequest(user._id, variant, user.store);
  };

  const handleSeenRequest = (id, seen) => {
    !seen && updateRequest(id);
    setIsNotification(!isNotification);
    storeRequestIdForOneMinute(id);
    navigate("/request");
  };
  const handleSeenApproved = (id) => {
    setIsNotification(!isNotification);
    storeRequestIdForOneMinute(id);
    navigate("/request");
  };

  // notification panel handler
  const handleNotificationOpen = () => {
    setIsNotification(!isNotification);
    isIconRef.current = true;
  };

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        if (!isIconRef.current) {
          setIsNotification(false);
        }
        isIconRef.current = false;
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: "70px",
          display: "flex",
          backgroundColor: "#5e35b1",
          width: isSidebarOpen
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${collapse}px)`,
          transition: "0.5s",
          paddingRight: "0px !important",
        }}
      >
        <Toolbar>
          <IconButton
            disableRipple
            size="small"
            edge="start"
            aria-label="open drawer"
            onClick={toggleSidebar}
            className=" relative"
          >
            {isSidebarOpen ? (
              <MenuIcon
                className="w-12 h-9 mr-2"
                sx={{
                  color: "#fff",
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
          <Typography sx={{ color: "#fff" }}>
            {user.role !== "sm" ? "PStore" : stores.storeName}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ color: "#fff", padding: 3 }}>{user.email}</Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              ref={notificationRef}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationOpen}
            >
              <Badge
                badgeContent={
                  user.role === "sm"
                    ? filteredBadgeAmount.length
                    : requestAmount.length
                }
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Notification Box */}
          <Box
            ref={notificationRef}
            sx={{ display: isNotification ? "block" : "none" }}
            className="absolute bg-white shadow-2xl w-80 h-auto right-16 top-16 rounded-xl "
          >
            {/* header */}
            <Box className="text-blue-950 pt-5 px-2  h-16 border-b border-b-gray-300 flex justify-between text-sm">
              <Typography variant="p">App Notification</Typography>
              <Link>Mark as all unread</Link>
            </Box>

            {/* body */}
            <Box className="w-80 h-96 overflow-y-auto">
              {/* Warning notification */}
              {user.role === "sm" &&
                variantUnderThreshold.map((variant) => {
                  const variantId = variant._id.toString(); // Convert variant._id to a string
                  const isSent = sentRequest.some(
                    (request) => request.variantId === variantId
                  );
                  return (
                    <Box
                      key={variant._id}
                      className="flex p-2 border-b border-t-gray-300 hover:bg-slate-200"
                      sx={{ background: isSent ? "#fff" : "#E3F2FD" }}
                    >
                      <img
                        src={require("../assets/warning.png")}
                        alt="store"
                        className=" rounded-full object-contain w-12 h-12 bg-red-200"
                      />
                      <Box className="text-blue-950 px-2 py-3 h-32">
                        <Box className=" text-sm flex justify-between">
                          <Typography variant="p" className=" font-semibold	">
                            Warning:
                          </Typography>
                          <Typography variant="p" className="text-xs">
                            {formatDistanceToNow(new Date(variant.updatedAt), {
                              addSuffiX: true,
                            })}
                          </Typography>
                        </Box>

                        <Box className="text-xs flex justify-center p-2">
                          <Typography
                            variant="p"
                            className="text-xs whitespace-break-spaces "
                          >
                            {variant.modelName} goes under threshold value.
                            Request for transfer as soon as possible
                          </Typography>
                        </Box>
                        <Box className="flex justify-start">
                          <button className="text-red-500 text-sm  bg-red-200 lowercase p-1 rounded-full px-2 !important m-1 ">
                            {isSent ? "seen" : "unread"}
                          </button>
                          <Button
                            onClick={() => handleSendRequest(variant)}
                            disabled={isSent ? true : false}
                            sx={styledButton}
                          >
                            {isSent ? "Sent" : "Send Request"}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}

              {/* Approved request */}
              {user.role === "sm" &&
                approvedRequest.map((variant) => {
                  return (
                    <Box
                      key={variant._id}
                      className="flex p-2 border-b border-t-gray-300 hover:bg-slate-200"
                    >
                      <img
                        src={require("../assets/store.png")}
                        alt="store"
                        className=" rounded-full object-contain w-12 h-12 bg-green-200"
                      />
                      <Box className="text-blue-950 px-2 py-3 h-32">
                        <Box className=" text-sm flex justify-between">
                          <Typography variant="p" className=" font-semibold	">
                            Approved:
                          </Typography>
                          <Typography variant="p" className="text-xs">
                            {formatDistanceToNow(new Date(variant.updatedAt), {
                              addSuffiX: true,
                            })}
                          </Typography>
                        </Box>

                        <Box className="text-xs flex justify-center p-2">
                          <Typography
                            variant="p"
                            className="text-xs whitespace-break-spaces "
                          >
                            {variant.modelName} goes under threshold value.
                            Request for transfer as soon as possible
                          </Typography>
                        </Box>
                        <Box className="flex justify-start">
                          <button className="text-red-500 text-sm  bg-red-200 lowercase p-1 rounded-full px-2 !important m-1 ">
                            approved
                          </button>
                          <Button
                            onClick={() => handleSeenApproved(variant._id)}
                            sx={styledButton}
                          >
                            View
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}

              {/* transfer notification */}
              {user.role !== "sm" &&
                sentRequest.map((variant) => {
                  return (
                    <Box
                      key={variant._id}
                      className="flex p-2 border-b border-t-gray-300 hover:bg-slate-200"
                      sx={{
                        background:
                          variant.readStatus === "notSeen" ? "#E3F2FD" : "#fff",
                      }}
                    >
                      <img
                        src={require("../assets/store.png")}
                        alt="store"
                        className=" rounded-full object-contain w-12 h-12 bg-green-200"
                      />
                      <Box className="text-blue-950 px-2 py-3 h-32">
                        <Box className=" text-sm flex justify-between">
                          <Typography variant="p" className=" font-semibold	">
                            Transfer Request:
                          </Typography>
                          <Typography variant="p" className="text-xs">
                            {formatDistanceToNow(new Date(variant.createdAt), {
                              addSuffiX: true,
                            })}
                          </Typography>
                        </Box>

                        <Box className="text-xs flex justify-center p-2">
                          <Typography
                            variant="p"
                            className="text-xs whitespace-break-spaces "
                          >
                            {variant.modelName} {variant.product} goes under
                            threshold value in {variant.storeName} and needs
                            transfer.
                          </Typography>
                        </Box>
                        <Box className="flex justify-start">
                          <button className="text-red-500 text-sm  bg-red-200 lowercase p-1 rounded-full px-2 !important m-1 ">
                            {variant.requestStatus === "Pending"
                              ? "seen"
                              : "unread"}
                          </button>
                          <Button
                            variant="contained"
                            onClick={() =>
                              handleSeenRequest(
                                variant._id,
                                variant.requestStatus === "Pending"
                                  ? true
                                  : false
                              )
                            }
                            sx={styledButton}
                          >
                            View Request
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            {/* footer */}
            <Box className=" bg-white  pt-1 text-sky-500 border border-t-slate-300 flex justify-center rounded-bl-xl rounded-br-xl">
              <Button className=" ">View All</Button>
            </Box>
          </Box>
          {/* End of notification box */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
export default NavBar;
