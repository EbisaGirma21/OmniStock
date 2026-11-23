import {
  Box,
  Card,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
import VariantDelete from "./VariantDelete";
import VariantUpdate from "./VariantUpdate";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VariantCard({ variant, setIsDetail, setSelectedId }) {
  const [expanded, setExpanded] = useState(false);
  const [deleteOpen, setdDeleteOpen] = useState(false);
  const [editOpen, setdEditOpen] = useState(false);
  const [variantId, setVariantId] = useState("");
  const [imgIndex, setImgIndex] = useState(0);

  const handleDeleteOpen = () => setdDeleteOpen(true);
  const handleDeleteClose = () => {
    setdDeleteOpen(false);
    setVariantId("");
  };
  const handleDeleteVariant = (id) => {
    handleDeleteOpen();
    setVariantId(id);
  };

  const handleEditOpen = () => setdEditOpen(true);
  const handleEditClose = () => {
    setdEditOpen(false);
    setVariantId("");
  };
  const handleEditVariant = (id) => {
    handleEditOpen();
    setVariantId(id);
  };

  const handleExpandClick = () => setExpanded(!expanded);
  const handleDetailClick = (id) => {
    setIsDetail(true);
    setSelectedId(id);
  };

  let content = "";
  if (deleteOpen) {
    content = (
      <VariantDelete
        open={deleteOpen}
        handleClose={handleDeleteClose}
        variantId={variantId}
      />
    );
  }
  if (editOpen) {
    content = (
      <VariantUpdate
        open={editOpen}
        handleClose={handleEditClose}
        variantId={variantId}
      />
    );
  }

  const stockColor =
    variant.amount < 10
      ? "#f44336"
      : variant.amount < 30
        ? "#ff9800"
        : "#4caf50";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "18px",
        border: "1px solid #f0eef8",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 36px rgba(94,53,177,0.13)",
        },
        bgcolor: "#fff",
      }}
    >
      {/* Image section */}
      <Box sx={{ position: "relative", bgcolor: "#f9f9fb" }}>
        <img
          src={variant.images[imgIndex]?.url || variant.images[0]?.url}
          alt={variant.variantName}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Condition badge */}
        <Chip
          label={variant.condition}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: variant.condition === "New" ? "#4caf50" : "#ff9800",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.65rem",
            height: "22px",
          }}
        />
        {/* Stock badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.92)",
            borderRadius: "8px",
            px: 1,
            py: 0.3,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            backdropFilter: "blur(4px)",
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: stockColor,
            }}
          />
          <Typography
            sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#333" }}
          >
            {variant.amount} left
          </Typography>
        </Box>

        {/* Thumbnail strip */}
        {variant.images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.8,
            }}
          >
            {variant.images.map((img, i) => (
              <Box
                key={img._id}
                onClick={() => setImgIndex(i)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border:
                    i === imgIndex
                      ? "2px solid #5e35b1"
                      : "2px solid rgba(255,255,255,0.6)",
                  transition: "border 0.15s",
                }}
              >
                <img
                  src={img.url}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Card body */}
      <Box sx={{ p: 1.8 }}>
        {/* Brand */}
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "#9e9e9e",
            fontWeight: 500,
            mb: 0.2,
          }}
        >
          {variant.brandName}
        </Typography>

        {/* Model name */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#1a1a2e",
            mb: 0.6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {variant.variantName}
        </Typography>

        {/* Size chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.2 }}>
          {variant.sizes.map((size) => (
            <Box
              key={size}
              sx={{
                px: 0.9,
                py: 0.25,
                bgcolor: "#EDE7F6",
                borderRadius: "5px",
                fontSize: "0.63rem",
                fontWeight: 700,
                color: "#5e35b1",
                lineHeight: 1.5,
              }}
            >
              {size}
            </Box>
          ))}
        </Box>

        {/* Price + gender row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            sx={{ fontWeight: 800, color: "#5e35b1", fontSize: "1.05rem" }}
          >
            ETB {Number(variant.price).toLocaleString()}
          </Typography>
          <Chip
            label={variant.gender}
            size="small"
            sx={{
              fontSize: "0.65rem",
              height: "20px",
              bgcolor: "#f3f0fb",
              color: "#5e35b1",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Action row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #f3f0fb",
            pt: 1,
            mt: 0.5,
          }}
        >
          <Tooltip title="View Detail">
            <IconButton
              size="small"
              onClick={() => handleDetailClick(variant._id)}
              sx={{ color: "#5e35b1", "&:hover": { bgcolor: "#EDE7F6" } }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEditVariant(variant._id)}
              sx={{ color: "#5e35b1", "&:hover": { bgcolor: "#EDE7F6" } }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDeleteVariant(variant._id)}
              sx={{ color: "#f44336", "&:hover": { bgcolor: "#ffebee" } }}
            >
              <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            size="small"
            sx={{ color: "#9e9e9e" }}
          >
            <ExpandMoreIcon fontSize="small" />
          </ExpandMore>
        </Box>
      </Box>

      {/* Expanded detail */}
      <Collapse in={expanded} timeout="auto">
        <Box
          sx={{
            mx: 1.8,
            mb: 1.8,
            p: 1.5,
            bgcolor: "#f9f8ff",
            borderRadius: "12px",
            border: "1px solid #EDE7F6",
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#9e9e9e", mb: 0.3 }}
              >
                Colors
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e" }}
              >
                {variant.colors.join(", ")}
              </Typography>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#9e9e9e", mt: 1, mb: 0.3 }}
              >
                Gender
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e" }}
              >
                {variant.gender}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#9e9e9e", mb: 0.3 }}
              >
                Condition
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e" }}
              >
                {variant.condition}
              </Typography>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#9e9e9e", mt: 1, mb: 0.3 }}
              >
                Amount
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: 600, color: stockColor }}
              >
                {variant.amount} units
              </Typography>
            </Box>
          </Box>
          {variant.shortDescription && (
            <Box sx={{ mt: 1.2 }}>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#9e9e9e", mb: 0.3 }}
              >
                Description
              </Typography>
              <Typography
                sx={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.5 }}
              >
                {variant.shortDescription}
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>

      {content}
    </Card>
  );
}
