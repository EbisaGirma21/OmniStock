import {
  Box,
  Card,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import ProductCatagoryDelete from "./ProductCatagoryDelete";
import ProductCatagoryUpdate from "./ProductCatagoryUpdate";
import { Link } from "react-router-dom";

export default function ProductCatagoryCard({ productCatagory }) {
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [productCatagoryId, setProductCatagoryId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const path = "http://localhost:3000/productCatagory";
  const currentUrl = window.location.href;

  const handleDeleteOpen = () => setdDeleteOpen(true);
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setProductCatagoryId("");
  };
  const handleDeleteProductCatagory = (id) => {
    handleDeleteOpen();
    setProductCatagoryId(id);
  };

  const handleEditOpen = () => setdEditOpen(true);
  const handleEditClose = () => {
    setdEditOpen(false);
    setProductCatagoryId("");
  };
  const handleEditProductCatagory = (id) => {
    handleEditOpen();
    setProductCatagoryId(id);
  };

  const handleCatagoryClick = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.productCatagory = id;
    localStorage.setItem("user", JSON.stringify(user));
  };

  let content = "";
  if (deleteOpen) {
    content = (
      <ProductCatagoryDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }
  if (editOpen) {
    content = (
      <ProductCatagoryUpdate
        open={editOpen}
        handleClose={handleEditClose}
        productCatagoryId={productCatagoryId}
      />
    );
  }

  const canSeeMore =
    ((user.role === "admin" || user.role === "super") && currentUrl !== path) ||
    user.role === "sm";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        border: "1px solid #f0eef8",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 36px rgba(94,53,177,0.13)",
        },
        bgcolor: "#fff",
        position: "relative",
      }}
    >
      {/* Admin action buttons */}
      {(user.role === "admin" || user.role === "super") && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: 0.5,
            zIndex: 2,
          }}
        >
          <Tooltip title="Edit category">
            <IconButton
              size="small"
              onClick={() => handleEditProductCatagory(productCatagory._id)}
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                "&:hover": { bgcolor: "#EDE7F6", color: "#5e35b1" },
                width: 32,
                height: 32,
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete category">
            <IconButton
              size="small"
              onClick={() => handleDeleteProductCatagory(productCatagory._id)}
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                "&:hover": { bgcolor: "#ffebee", color: "#f44336" },
                width: 32,
                height: 32,
              }}
            >
              <DeleteForeverOutlinedIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {content}

      {/* Category image */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#f3f0fb",
          height: 180,
          overflow: "hidden",
        }}
      >
        <img
          src={productCatagory.image.url}
          alt={productCatagory.productCatagoryName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.35s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.07)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Box>

      {/* Card content */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#1a1a2e",
            mb: 1,
          }}
        >
          {productCatagory.productCatagoryName}
        </Typography>

        {/* Sub-category chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 2 }}>
          {productCatagory.productNames.slice(0, 4).map((p) => (
            <Chip
              key={p._id}
              label={p.name}
              size="small"
              sx={{
                bgcolor: "#EDE7F6",
                color: "#5e35b1",
                fontWeight: 600,
                fontSize: "0.65rem",
                height: "22px",
              }}
            />
          ))}
          {productCatagory.productNames.length > 4 && (
            <Chip
              label={`+${productCatagory.productNames.length - 4} more`}
              size="small"
              sx={{
                bgcolor: "#f5f5f5",
                color: "#9e9e9e",
                fontSize: "0.65rem",
                height: "22px",
              }}
            />
          )}
        </Box>

        {/* Footer row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "0.72rem", color: "#9e9e9e" }}>
            {productCatagory.productNames.length} product types
          </Typography>
          {canSeeMore && (
            <Link
              onClick={() => handleCatagoryClick(productCatagory._id)}
              to={`:${productCatagory.productCatagoryName}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4,
                  color: "#5e35b1",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": { color: "#4527a0" },
                  transition: "color 0.15s",
                }}
              >
                Browse
                <ArrowForwardIcon sx={{ fontSize: "0.85rem" }} />
              </Box>
            </Link>
          )}
        </Box>
      </Box>
    </Card>
  );
}
