import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { Box, TextField } from "@mui/material";
import VariantsContext from "../../../context/VariantContext";

const VariantCreate = ({ handleClose, open }) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [store] = useState(user.store);
  const [productCatagory] = useState(user.productCatagory);

  // useState for the form inputs
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [variantName, setVariantName] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // Context creation
  const { createVariant } = useContext(VariantsContext);

  // Change handler functions
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };
  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  };
  const handleVariantNameChange = (e) => {
    setVariantName(e.target.value);
  };
  const handleSizesChange = (e) => {
    setSizes(e.target.value.split(",").map((size) => size.trim()));
  };
  const handleColorsChange = (e) => {
    setColors(e.target.value.split(",").map((color) => color.trim()));
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleShortDescriptionChange = (e) => {
    setShortDescription(e.target.value);
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => setFileToBase(file));
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFiles((prevImageFiles) => [...prevImageFiles, reader.result]);
    };
  };

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      productName,
      brandName,
      modelName,
      variantName,
      imageFiles,
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription,
      store,
      productCatagory
    );
    createVariant(
      productName,
      brandName,
      modelName,
      variantName,
      imageFiles,
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription,
      store,
      productCatagory
    );

    setVariantName("");
    setImageFiles([]);
  };

  return (
    <Modal
      title="New Variant"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form encType="multipart/form-data">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ m: 1, textAlign: "center" }}>
            <TextField
              margin="dense"
              label="Product Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={productName}
              onChange={handleProductNameChange}
            />
            <TextField
              margin="dense"
              label="Model Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={modelName}
              onChange={handleModelNameChange}
            />{" "}
            <TextField
              margin="dense"
              label="Sizes"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={sizes}
              onChange={handleSizesChange}
            />{" "}
            <TextField
              margin="dense"
              label="Price"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={price}
              onChange={handlePriceChange}
            />
            <TextField
              margin="dense"
              label="Condition"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={condition}
              onChange={handleConditionChange}
            />{" "}
            <TextField
              margin="dense"
              label="Description"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={shortDescription}
              onChange={handleShortDescriptionChange}
            />
          </Box>
          <Box sx={{ m: 1, textAlign: "center" }}>
            <TextField
              margin="dense"
              label="Brand Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={brandName}
              onChange={handleBrandNameChange}
            />
            <TextField
              margin="dense"
              label="Variant Name"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={variantName}
              onChange={handleVariantNameChange}
            />
            <TextField
              margin="dense"
              label="Colors"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={colors}
              onChange={handleColorsChange}
            />
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={amount}
              onChange={handleAmountChange}
            />{" "}
            <TextField
              margin="dense"
              label="Gender"
              type="text"
              sx={{ minWidth: 300 }}
              variant="standard"
              value={gender}
              onChange={handleGenderChange}
            />{" "}
            <TextField
              margin="dense"
              label="Images"
              type="file"
              sx={{ minWidth: 300 }}
              variant="standard"
              inputProps={{ multiple: true }}
              onChange={handleImageChange}
            />
          </Box>

          {/* <Box sx={{ display: "flex" }}>
          {imageFiles.map((file, index) => (
            <img
              key={index}
              src={file}
              alt=""
              width="150px"
              height="120px"
              style={{ display: "flex" }}
            />
          ))}
        </Box> */}
        </Box>
      </form>
    </Modal>
  );
};

export default VariantCreate;
