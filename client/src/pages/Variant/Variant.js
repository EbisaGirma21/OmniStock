import VariantCard from "./components/VariantCard";
import { useContext } from "react";
import VariantsContext from "../../context/VariantContext";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, TextField, Typography } from "@mui/material";
import VariantCreate from "./components/VariantCreate";
import { useState } from "react";
import SellsContext from "../../context/SellContext";
import PurchasesContext from "../../context/PurchaseContext";
import Dialog from "./components/SellDialog";
import SellDialog from "./components/SellDialog";
import PurchaseDialog from "./components/PurchaseDialog";

const Variant = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setdDialogOpen] = useState(false);
  const [purchaseDialogOpen, setdPurchaseDialogOpen] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [isDetail, setIsDetail] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  const { createSell } = useContext(SellsContext);
  const { createPurchase } = useContext(PurchasesContext);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDialogOpen = () => {
    setdDialogOpen(true);
  };
  const handlePurchaseDialogOpen = () => {
    setdPurchaseDialogOpen(true);
  };

  const handleDialogClose = () => {
    setdDialogOpen(false);
  };
  const handlePurchaseDialogClose = () => {
    setdPurchaseDialogOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSell(user._id, selectedId, selectedVariant[0].price, amount);

    setAmount("");
  };
  const handlePSubmit = (e) => {
    e.preventDefault();
    createPurchase(user._id, selectedId, selectedVariant[0].price, amount);

    setAmount("");
  };
  let content = "";
  if (dialogOpen) {
    content = (
      <SellDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    );
  }
  if (purchaseDialogOpen) {
    content = (
      <PurchaseDialog
        open={purchaseDialogOpen}
        handleClose={handlePurchaseDialogClose}
        handlePSubmit={handlePSubmit}
      />
    );
  }
  const { variants, fetchVariants } = useContext(VariantsContext);
  const variantByStores = variants.filter((variant) => {
    return (variant.store === user.store) & (variant._id !== selectedId);
  });

  const renderedVariants = variantByStores.map((variantByStore) => {
    return (
      <Grid key={variantByStore._id} item xs={12} sm={6} md={4} lg={3}>
        <VariantCard
          variant={variantByStore}
          setIsDetail={setIsDetail}
          setSelectedId={setSelectedId}
        />
      </Grid>
    );
  });
  useEffect(() => {
    fetchVariants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  const selectedVariant = variants.filter((variant) => {
    return variant._id === selectedId;
  });
  return (
    <Box>
      <Box sx={{ m: 1 }}>
        <Typography>Products</Typography>
      </Box>
      {user.store && (
        <Button
          onClick={handleOpen}
          variant="contained"
          className="add__button"
        >
          <AddIcon />
          New
        </Button>
      )}
      <VariantCreate open={open} handleClose={handleClose} />
      <Box
        sx={{
          display: isDetail ? "block" : "none",
          height: "60vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: 1,
            border: "1px solid #c0c5cc",
            borderRadius: "10px",
            height: "100%",
            width: "95%",
            alignItems: "center",
          }}
        >
          <Box sx={{ m: 1, width: "100px", height: "150px" }}>
            {isDetail &&
              selectedVariant[0].images &&
              selectedVariant[0].images.map((image) => (
                <img
                  key={image.url}
                  src={image.url}
                  alt=""
                  style={{ padding: 2, objectFit: "cover" }}
                  width="100%"
                  height="100%"
                />
              ))}
          </Box>
          <Box sx={{ m: 1, width: "50%" }}>
            {isDetail && (
              <img
                src={selectedVariant[0].images[0].url}
                width="500px"
                style={{
                  height: "450px",
                }}
                alt=""
              />
            )}
          </Box>
          {isDetail && (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ m: 3, display: "flex" }}>
                <Box>
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
                    Gender: {selectedVariant[0].gender}
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
                    Title: {selectedVariant[0].variantName}
                  </Typography>
                  <Typography sx={{ m: 2 }}>
                    Condition: {selectedVariant[0].condition}
                  </Typography>

                  <Typography sx={{ m: 2 }}>
                    Price: {selectedVariant[0].price}
                  </Typography>
                  <Typography sx={{ m: 2 }}>
                    Amount: {selectedVariant[0].amount}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", m: 3 }}>
                <TextField
                  margin="dense"
                  label="Amount"
                  type="number"
                  variant="standard"
                  value={amount}
                  onChange={handleAmountChange}
                />
                {content}
                <Button
                  variant="contained"
                  onClick={() => {
                    amount && handleDialogOpen();
                  }}
                  sx={{ m: 1 }}
                >
                  Selled
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    amount && handlePurchaseDialogOpen();
                  }}
                  sx={{ m: 1 }}
                >
                  Purchassed
                </Button>
              </Box>
            </Box>
          )}
          {isDetail && (
            <Button
              variant="contained"
              onClick={() => {
                setIsDetail(false);
                setSelectedId("");
              }}
              sx={{ height: "100%" }}
            >
              Hide
            </Button>
          )}
        </Box>
      </Box>
      <Grid sx={{ m: 1 }} container spacing={4}>
        {renderedVariants}
      </Grid>
    </Box>
  );
};

export default Variant;
