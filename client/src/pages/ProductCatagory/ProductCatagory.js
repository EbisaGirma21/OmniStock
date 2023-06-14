import ProductCatagoryCard from "./components/ProductCatagoryCard";
import { useContext } from "react";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import ProductCatagoryCreate from "./components/ProductCatagoryCreate";
import { useState } from "react";

const ProductCatagory = () => {
  const [open, setOpen] = useState(false);
  const path = "http://localhost:3000/productCatagory";
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUrl = window.location.href;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );

  const renderedProductCatagorys = productCatagories.map((productCatagory) => {
    return (
      <Grid key={productCatagory._id} item xs={12} sm={6} md={4} lg={3}>
        <ProductCatagoryCard productCatagory={productCatagory} />
      </Grid>
    );
  });

  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography>ProductCatagory</Typography>
      </Box>
      {(user.role === "super" || user.role === "admin") &&
        currentUrl === path && (
          <Button
            onClick={handleOpen}
            variant="contained"
            className="add__button"
          >
            <AddIcon />
            New
          </Button>
        )}
      <ProductCatagoryCreate open={open} handleClose={handleClose} />
      <Grid container spacing={4}>
        {renderedProductCatagorys}
      </Grid>
    </>
  );
};

export default ProductCatagory;
