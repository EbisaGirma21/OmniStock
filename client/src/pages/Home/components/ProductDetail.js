import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Header from "../../../components/UI/Header";
import Footer from "../../../components/UI/footer";
import VariantsContext from "../../../context/VariantContext";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const ProductDetail = () => {
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedName"),
  );
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const { variants } = useContext(VariantsContext);

  const uniqueVariants = Object.values(
    variants.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {}),
  );

  const handleProductClick = (name) => {
    setSelected(name);
    setImgIndex(0);
    setSelectedSize(null);
    localStorage.setItem("selectedName", name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedVariant = variants.filter((v) => v.modelName === selected);
  const current = selectedVariant[0];

  const stockColor = current
    ? current.amount < 10
      ? "#f44336"
      : current.amount < 30
        ? "#ff9800"
        : "#4caf50"
    : "#4caf50";

  if (!current) {
    return (
      <Box>
        <Header isLogin={true} />
        <Box sx={{ mt: "80px", textAlign: "center", py: 10 }}>
          <Typography>Product not found.</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F5F5F7", minHeight: "100vh" }}>
      <Header isLogin={true} />

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, pt: "100px", pb: 4 }}>
        {/* ── Main detail panel ── */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: 4,
          }}
        >
          {/* Images column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              p: 2,
              gap: 1.5,
            }}
          >
            {/* Thumbnail strip */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {current.images.map((image, index) => (
                <Box
                  key={`${current.modelName}${index}`}
                  onClick={() => setImgIndex(index)}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      index === imgIndex
                        ? "2.5px solid #5e35b1"
                        : "2px solid #f0eef8",
                    transition: "border 0.15s",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={image.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Main image */}
            <Box
              sx={{
                width: { xs: "100%", md: "380px" },
                height: "360px",
                borderRadius: "18px",
                overflow: "hidden",
                bgcolor: "#f9f9fb",
                flexShrink: 0,
              }}
            >
              <img
                src={current.images[imgIndex]?.url || current.images[0].url}
                alt={current.modelName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>

          {/* Info column */}
          <Box sx={{ flex: 1, p: 3 }}>
            {/* Brand + badges */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography
                sx={{ color: "#9e9e9e", fontSize: "0.85rem", fontWeight: 500 }}
              >
                {current.brandName}
              </Typography>
              <Chip
                label={current.condition}
                size="small"
                sx={{
                  bgcolor: current.condition === "New" ? "#e8f5e9" : "#fff3e0",
                  color: current.condition === "New" ? "#2e7d32" : "#e65100",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              />
              <Chip
                label={current.gender}
                size="small"
                sx={{
                  bgcolor: "#EDE7F6",
                  color: "#5e35b1",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              />
            </Box>

            {/* Product name */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#1a1a2e",
                mb: 0.5,
                lineHeight: 1.2,
              }}
            >
              {current.modelName}
            </Typography>
            <Typography sx={{ color: "#9e9e9e", fontSize: "0.85rem", mb: 2 }}>
              {current.productName}
            </Typography>

            {/* Price */}
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2.5 }}
            >
              <Typography
                sx={{ fontWeight: 800, fontSize: "2rem", color: "#5e35b1" }}
              >
                ETB {Number(current.price).toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: stockColor,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: stockColor,
                    fontWeight: 600,
                  }}
                >
                  {current.amount} in stock
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            {current.shortDescription && (
              <Typography
                sx={{
                  color: "#555",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  mb: 2.5,
                  maxWidth: "480px",
                }}
              >
                {current.shortDescription}
              </Typography>
            )}

            {/* Size selector */}
            <Box sx={{ mb: 2.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  mb: 1,
                  color: "#1a1a2e",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Select Size
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {current.sizes.map((size) => (
                  <Box
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      px: 1.5,
                      py: 0.6,
                      borderRadius: "8px",
                      border: "1.5px solid",
                      borderColor:
                        selectedSize === size ? "#5e35b1" : "#e0e0e0",
                      bgcolor: selectedSize === size ? "#EDE7F6" : "#fff",
                      color: selectedSize === size ? "#5e35b1" : "#555",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      "&:hover": { borderColor: "#5e35b1", bgcolor: "#f3f0fb" },
                    }}
                  >
                    {size}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Colors */}
            <Box sx={{ mb: 2.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  mb: 1,
                  color: "#1a1a2e",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Colors
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                {current.colors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    size="small"
                    sx={{
                      bgcolor: "#f9f9fb",
                      color: "#333",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      border: "1px solid #e0e0e0",
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Available stores */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  mb: 1,
                  color: "#1a1a2e",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Available At
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {selectedVariant.map((v) => (
                  <Box
                    key={v._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      px: 1.2,
                      py: 0.5,
                      bgcolor: "#f3f0fb",
                      borderRadius: "8px",
                    }}
                  >
                    <StorefrontOutlinedIcon
                      sx={{ fontSize: "0.85rem", color: "#5e35b1" }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#5e35b1",
                      }}
                    >
                      {v.storeName || "Main Store"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Trust badges */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                pt: 2,
                borderTop: "1px solid #f0eef8",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <LocalShippingOutlinedIcon
                  sx={{ fontSize: "1rem", color: "#5e35b1" }}
                />
                <Typography sx={{ fontSize: "0.72rem", color: "#555" }}>
                  Fast Delivery
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                <VerifiedOutlinedIcon
                  sx={{ fontSize: "1rem", color: "#5e35b1" }}
                />
                <Typography sx={{ fontSize: "0.72rem", color: "#555" }}>
                  Verified Product
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── Related products ── */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "#1a1a2e",
              mb: 2,
            }}
          >
            You may also like
          </Typography>
          <Grid container spacing={2}>
            {uniqueVariants
              .filter((v) => v.modelName !== selected)
              .slice(0, 8)
              .map((variant) => (
                <Grid key={variant._id} item xs={12} sm={6} md={3} lg={3}>
                  <Box
                    onClick={() => handleProductClick(variant.modelName)}
                    sx={{
                      bgcolor: "#fff",
                      borderRadius: "16px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 28px rgba(94,53,177,0.13)",
                      },
                    }}
                  >
                    <img
                      src={variant.images[0].url}
                      alt={variant.modelName}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <Box sx={{ p: 1.5 }}>
                      <Typography
                        sx={{ fontSize: "0.7rem", color: "#9e9e9e", mb: 0.2 }}
                      >
                        {variant.brandName}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: "#1a1a2e",
                          mb: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {variant.modelName}
                      </Typography>
                      {/* Sizes preview */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.4,
                          flexWrap: "wrap",
                          mb: 0.8,
                        }}
                      >
                        {variant.sizes.slice(0, 3).map((s) => (
                          <Box
                            key={s}
                            sx={{
                              px: 0.7,
                              py: 0.15,
                              bgcolor: "#EDE7F6",
                              borderRadius: "4px",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              color: "#5e35b1",
                            }}
                          >
                            {s}
                          </Box>
                        ))}
                        {variant.sizes.length > 3 && (
                          <Box
                            sx={{
                              px: 0.7,
                              py: 0.15,
                              bgcolor: "#f5f5f5",
                              borderRadius: "4px",
                              fontSize: "0.6rem",
                              color: "#9e9e9e",
                            }}
                          >
                            +{variant.sizes.length - 3}
                          </Box>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#5e35b1",
                          fontSize: "0.95rem",
                        }}
                      >
                        ETB {Number(variant.price).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetail;
