import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";

const ProductCatagoryUpdate = (props) => {
  const { handleClose, open, productCatagoryId } = props;

  //   context inclusiion
  const { editProductCatagoryById, productCatagorys } = useContext(ProductCatagorysContext);

  const productCatagory = productCatagorys.filter((pro) => {
    return pro._id === productCatagoryId;
  });

  // useSate for hte for input
  const [productCatagoryName, setProductCatagoryName] = useState(productCatagory[0].productCatagoryName);
  const [imageFile, setImageFile] = useState(productCatagory[0].image.url);

  // Change handler funtions
  const handleProductCatagoryNameChange = (e) => {
    setProductCatagoryName(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  // submit functions
  const handleSubmit = () => {
    editProductCatagoryById(productCatagoryId, productCatagoryName, imageFile);
    setProductCatagoryName("");
    setImageFile([]);
  };

  return (
    <Modal
      title="Edit ProductCatagory"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form>
        <TextField
          margin="dense"
          label="Catagory"
          type="text"
          sx={{ minWidth: 300 }}
          variant="standard"
          value={productCatagoryName}
          onChange={handleProductCatagoryNameChange}
        />
        <TextField
          margin="dense"
          label="Image"
          type="file"
          sx={{ minWidth: 300 }}
          variant="standard"
          onChange={handleImageChange}
        />
      </form>
    </Modal>
  );
};

export default ProductCatagoryUpdate;
