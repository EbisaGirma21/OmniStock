import React, { useContext, useState } from "react";
import Header from "../../components/UI/Header";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import VariantsContext from "../../context/VariantContext";
import Footer from "../../components/UI/footer";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = () => {
  const [hoveredCatagory, setHoveredCatagory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const { productCatagories } = useContext(ProductCatagorysContext);
  const { variants } = useContext(VariantsContext);

  const navigate = useNavigate();

  // Make variants unique by modelName
  const uniqueVariants = Object.values(
    variants.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {}),
  );

  // Filter by search query and active category filter
  const filteredVariants = uniqueVariants.filter((v) => {
    const matchesSearch =
      searchQuery === "" ||
      v.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || v.productName === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedCatagory =
    hoveredCatagory === ""
      ? []
      : productCatagories.filter((c) => c._id === hoveredCatagory);

  const handleMouseEnter = (id) => setHoveredCatagory(id);
  const handleMouseLeave = () => setHoveredCatagory("");

  const handleProductClick = (name) => {
    navigate("/:product/:detail");
    localStorage.setItem("selectedName", name);
  };

  const handleCatagoryClick = (product) => {
    localStorage.setItem("selectedProduct", product);
    navigate("/:product");
  };

  // Featured items (first 4 unique variants)
  const featuredVariants = uniqueVariants.slice(0, 4);

  // All product type filters
  const filters = ["All", ...new Set(uniqueVariants.map((v) => v.productName))];

  return (
    <Box sx={{ backgroundColor: "#F5F5F7", minHeight: "100vh" }}>
      <Header isLogin={true} />

      {/* ── Hero Banner ── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #5e35b1 0%, #3949ab 100%)",
          pt: "80px",
          pb: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: 4,
            py: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Left text */}
          <Box sx={{ flex: 1 }}>
            <Chip
              label="New Arrivals 2023"
              size="small"
              icon={
                <LocalFireDepartmentIcon sx={{ color: "#ff9800 !important" }} />
              }
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 600,
                mb: 2,
                backdropFilter: "blur(8px)",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontWeight: 800,
                lineHeight: 1.15,
                fontSize: { xs: "2rem", md: "3.2rem" },
                mb: 2,
              }}
            >
              Find Your Perfect
              <br />
              <Box component="span" sx={{ color: "#ffd54f" }}>
                Style
              </Box>{" "}
              Here
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.8)", mb: 3, fontSize: "1.1rem" }}
            >
              Browse thousands of products across footwear, clothing,
              electronics & more
            </Typography>
            {/* Search bar */}
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands..."
              variant="outlined"
              fullWidth
              sx={{
                maxWidth: 480,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                  borderRadius: "50px",
                  "& fieldset": { border: "none" },
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#5e35b1" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Right hero image */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
              alt="hero"
              style={{
                width: "380px",
                height: "280px",
                objectFit: "cover",
                borderRadius: "24px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              }}
            />
          </Box>
        </Box>

        {/* Wave divider */}
        <Box sx={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#F5F5F7"
              d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            />
          </svg>
        </Box>
      </Box>

      {/* ── Category + Product Grid ── */}
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 3, py: 4 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Left sidebar — categories */}
          <Box
            sx={{
              width: "220px",
              flexShrink: 0,
              position: "sticky",
              top: "90px",
              height: "fit-content",
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                overflow: "visible",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 1,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#5e35b1",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Categories
              </Typography>
              {productCatagories.map((cat) => (
                <Box
                  key={cat._id}
                  onMouseEnter={() => handleMouseEnter(cat._id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.2,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    "&:hover": { bgcolor: "#EDE7F6" },
                    borderRadius: "8px",
                    mx: 1,
                    mb: 0.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        overflow: "hidden",
                        bgcolor: "#f3f0fb",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={cat.image.url}
                        alt={cat.productCatagoryName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#1a1a2e",
                        }}
                      >
                        {cat.productCatagoryName}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#9e9e9e" }}>
                        {cat.productNames.length} types
                      </Typography>
                    </Box>
                  </Box>
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "0.65rem", color: "#bdbdbd" }}
                  />
                </Box>
              ))}
            </Box>

            {/* Sub-categories flyout */}
            {hoveredCatagory !== "" && selectedCatagory[0] && (
              <Box
                sx={{
                  position: "absolute",
                  left: "228px",
                  top: 0,
                  width: "200px",
                  bgcolor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  zIndex: 100,
                  py: 1,
                  border: "1px solid #EDE7F6",
                }}
              >
                <Typography
                  sx={{
                    px: 2,
                    py: 1,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#5e35b1",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {selectedCatagory[0].productCatagoryName}
                </Typography>
                {selectedCatagory[0].productNames.map((product) =>
                  product.image ? (
                    <Box
                      key={product._id}
                      onClick={() => handleCatagoryClick(product.name)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#EDE7F6" },
                        borderRadius: "8px",
                        mx: 1,
                        mb: 0.3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "8px",
                          overflow: "hidden",
                          bgcolor: "#f3f0fb",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={product.image.url}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "#1a1a2e",
                          }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null,
                )}
              </Box>
            )}
          </Box>

          {/* Right — product listings */}
          <Box sx={{ flex: 1 }}>
            {/* Featured banner */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
              }}
            >
              {featuredVariants.slice(0, 2).map((variant, i) => (
                <Box
                  key={variant._id}
                  onClick={() => handleProductClick(variant.modelName)}
                  sx={{
                    flex: 1,
                    bgcolor: i === 0 ? "#1a1a2e" : "#5e35b1",
                    borderRadius: "20px",
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    overflow: "hidden",
                    position: "relative",
                    minHeight: "150px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box sx={{ zIndex: 1 }}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.75rem",
                        mb: 0.5,
                      }}
                    >
                      {variant.brandName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        mb: 1,
                        maxWidth: "160px",
                      }}
                    >
                      {variant.modelName}
                    </Typography>
                    <Chip
                      label={`ETB ${variant.price.toLocaleString()}`}
                      size="small"
                      sx={{
                        bgcolor: "#ffd54f",
                        color: "#1a1a2e",
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                  <img
                    src={variant.images[0].url}
                    alt={variant.modelName}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "14px",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Filter chips */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {filters.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  onClick={() => setActiveFilter(f)}
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    bgcolor: activeFilter === f ? "#5e35b1" : "#fff",
                    color: activeFilter === f ? "#fff" : "#5e35b1",
                    border: "1.5px solid",
                    borderColor: "#5e35b1",
                    "&:hover": {
                      bgcolor: activeFilter === f ? "#4527a0" : "#EDE7F6",
                    },
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </Box>

            {/* Section title */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#1a1a2e" }}
              >
                {activeFilter === "All" ? "All Products" : activeFilter}
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    fontSize: "0.85rem",
                    color: "#9e9e9e",
                    fontWeight: 400,
                  }}
                >
                  ({filteredVariants.length})
                </Box>
              </Typography>
            </Box>

            {/* Product grid */}
            <Grid container spacing={2}>
              {filteredVariants.map((variant) => (
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
                    <Box sx={{ position: "relative", bgcolor: "#f9f9fb" }}>
                      <img
                        src={variant.images[0].url}
                        alt={variant.modelName}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          display: "block",
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
                        }}
                      />
                      {variant.amount < 10 && (
                        <Chip
                          label="Low Stock"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "#f44336",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.65rem",
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: "0.72rem",
                          color: "#9e9e9e",
                          mb: 0.3,
                          fontWeight: 500,
                        }}
                      >
                        {variant.brandName}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "#1a1a2e",
                          mb: 0.5,
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
                          gap: 0.4,
                          mb: 1,
                        }}
                      >
                        {variant.sizes.slice(0, 4).map((size) => (
                          <Box
                            key={size}
                            sx={{
                              px: 0.8,
                              py: 0.2,
                              bgcolor: "#EDE7F6",
                              borderRadius: "4px",
                              fontSize: "0.62rem",
                              fontWeight: 600,
                              color: "#5e35b1",
                            }}
                          >
                            {size}
                          </Box>
                        ))}
                        {variant.sizes.length > 4 && (
                          <Box
                            sx={{
                              px: 0.8,
                              py: 0.2,
                              bgcolor: "#f5f5f5",
                              borderRadius: "4px",
                              fontSize: "0.62rem",
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
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#5e35b1",
                            fontSize: "1rem",
                          }}
                        >
                          ETB {variant.price.toLocaleString()}
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

            {filteredVariants.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography sx={{ fontSize: "1rem", color: "#9e9e9e" }}>
                  No products match your search.
                </Typography>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  sx={{ mt: 2, color: "#5e35b1" }}
                >
                  Clear filters
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
