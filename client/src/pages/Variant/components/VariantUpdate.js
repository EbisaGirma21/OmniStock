import React, { useContext, useState } from "react";
import Modal from "../../../components/UI/Modal";
import { TextField } from "@mui/material";
import VariantsContext from "../../../context/VariantContext";

const VariantUpdate = (props) => {
  const { handleClose, open, variantId } = props;

  //   context inclusiion
  const { editVariantById, variants } = useContext(VariantsContext);

  const variant = variants.filter((pro) => {
    return pro._id === variantId;
  });

  // useSate for hte for input
  const [variantName, setVariantName] = useState(variant[0].variantName);
  const [imageFile, setImageFile] = useState(variant[0].image.url);

  // Change handler funtions
  const handleVariantNameChange = (e) => {
    setVariantName(e.target.value);
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
    editVariantById(variantId, variantName, imageFile);
    setVariantName("");
    setImageFile([]);
  };

  return (
    <Modal
      title="Edit Variant"
      btnText="New"
      onSubmit={handleSubmit}
      open={open}
      handleClose={handleClose}
    >
      <form>
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

export default VariantUpdate;
