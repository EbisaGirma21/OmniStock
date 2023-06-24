import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/UI/Header";
import Footer from "../../../components/UI/Footer";
import VariantsContext from "../../../context/VariantContext";

const ProductDetail = () => {
  // useState
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedName")
  );

  const { variants, fetchVariants } = useContext(VariantsContext);

  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // making varinat unique
  const uniqueVariants = Object.values(
    variants.reduce((uniqueMap, variant) => {
      if (!uniqueMap[variant.modelName]) {
        uniqueMap[variant.modelName] = variant;
      }
      return uniqueMap;
    }, {})
  );

  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProductClick = (name) => {
    setSelected(name);
    localStorage.setItem("selectedName", name);
  };

  const selectedVariant = uniqueVariants.filter((variant) => {
    return variant.modelName === selected;
  });
  console.log(selected,selectedVariant);

  return (
    <Box>
      <Header />
      <Box className="dialog-box bg-white flex shadow-xl  items-center mx-64  p-3 h-96 mt-32">
        <Box sx={{ m: 1, width: "100px", height: "150px" }}>
          {selectedVariant[0].images &&
            selectedVariant[0].images.map((image, index) => (
              <img
                key={`${selectedVariant[0].modelName}${index}`}
                src={image.url}
                alt=""
                style={{ padding: 2, objectFit: "contain" }}
              />
            ))}
        </Box>
        <Box className="m-1 w-1/2 border-slate-500">
          {
            <img
              src={selectedVariant[0].images[0].url}
              width="500px"
              alt=""
              className=" object-contain h-80   "
            />
          }
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ m: 3, display: "flex" }}>
            <Box className="w-3/5">
              <Typography sx={{ m: 2 }}>
                Name: {selectedVariant[0].productName}
              </Typography>

              <Typography sx={{ m: 2 }}>
                Model: {selectedVariant[0].modelName}
              </Typography>

              <Typography sx={{ m: 2 }}>
                Size: {selectedVariant[0].sizes.join(", ")}
              </Typography>
              <Typography sx={{ m: 2 }}>
                Colors: {selectedVariant[0].colors.join(", ")}
              </Typography>

              <Typography sx={{ m: 2 }}>
                Description: {selectedVariant[0].shortDescription}
              </Typography>
            </Box>
            <Box sx={{}}>
              <Typography sx={{ m: 2 }}>
                Brand: {selectedVariant[0].brandName}
              </Typography>
              <Typography sx={{ m: 2 }}>
                Condition: {selectedVariant[0].condition}
              </Typography>

              <Typography sx={{ m: 2 }}>
                Price: {selectedVariant[0].price}ETB
              </Typography>
              <Typography sx={{ m: 2 }}>
                Amount: {selectedVariant[0].amount}
              </Typography>
              <Typography sx={{ m: 2 }}>
                Gender: {selectedVariant[0].gender}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="mx-64 mt-10">
        <Grid container spacing={1}>
          {uniqueVariants.map((variant) => {
            return (
              <Grid key={variant._id} item xs={12} sm={6} md={4} lg={3}>
                <Box
                  className=" w-full h-full flex flex-col bg-white"
                  onClick={() => handleProductClick(variant.modelName)}
                >
                  <img
                    src={variant.images[0].url}
                    alt=""
                    className="h-64 w-full object-contain"
                  />
                  {variant.modelName}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
