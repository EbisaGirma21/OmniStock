import { Box, Chip, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import Header from "../../../components/UI/Header";
import Footer from "../../../components/UI/footer";
import VariantsContext from "../../../context/VariantContext";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { variants } = useContext(VariantsContext);
  const navigate = useNavigate();

  const selectedProduct = localStorage.getItem("selectedProduct");

  const filtered = variants.filter(
    (variant) => variant.productName === selectedProduct,
  );

  const uniqueVariants = Object.values(
    filtered.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {}),
  );

  const handleProductClick = (name) => {
    navigate(":detail");
    localStorage.setItem("selectedName", name);
  };

  return (
    <Box sx={{ bgcolor: "#F5F5F7", minHeight: "100vh" }}>
      <Header isLogin={true} />

      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, pt: "100px", pb: 4 }}>
        {/* Page header */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "#9e9e9e", fontSize: "0.85rem", mb: 0.5 }}>
            Browse ›{" "}
            <Box component="span" sx={{ color: "#5e35b1", fontWeight: 600 }}>
              {selectedProduct}
            </Box>
          </Typography>
          <Typography
            sx={{ fontWeight: 800, fontSize: "1.6rem", color: "#1a1a2e" }}
          >
            {selectedProduct}
            <Box
              component="span"
              sx={{
                ml: 1.5,
                fontSize: "1rem",
                color: "#9e9e9e",
                fontWeight: 400,
              }}
            >
              ({uniqueVariants.length} items)
            </Box>
          </Typography>
        </Box>

        {/* Product grid */}
        {uniqueVariants.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography sx={{ color: "#9e9e9e" }}>
              No products found in this category.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {uniqueVariants.map((variant) => (
              <Grid key={variant._id} item xs={12} sm={6} md={4} lg={3}>
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
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 32px rgba(94,53,177,0.15)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={variant.images[0].url}
                      alt={variant.modelName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        display: "block",
                        bgcolor: "#f9f9fb",
                      }}
                    />
                    <Chip
                      label={variant.condition}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor:
                          variant.condition === "New" ? "#4caf50" : "#ff9800",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        height: "22px",
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 1.8 }}>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        color: "#9e9e9e",
                        mb: 0.2,
                        fontWeight: 500,
                      }}
                    >
                      {variant.brandName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        color: "#1a1a2e",
                        mb: 0.8,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {variant.modelName}
                    </Typography>

                    {/* Size chips */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 1.2,
                      }}
                    >
                      {variant.sizes.slice(0, 4).map((size) => (
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
                          }}
                        >
                          {size}
                        </Box>
                      ))}
                      {variant.sizes.length > 4 && (
                        <Box
                          sx={{
                            px: 0.9,
                            py: 0.25,
                            bgcolor: "#f5f5f5",
                            borderRadius: "5px",
                            fontSize: "0.63rem",
                            color: "#9e9e9e",
                          }}
                        >
                          +{variant.sizes.length - 4}
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#5e35b1",
                          fontSize: "1rem",
                        }}
                      >
                        ETB {Number(variant.price).toLocaleString()}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.68rem", color: "#bdbdbd" }}
                      >
                        {variant.gender}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default Product;
