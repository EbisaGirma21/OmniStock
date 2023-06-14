import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StorePageProvider } from "../../context/CreateContext";
import VariantsContext from "../../context/VariantContext";
import ProductCatagoryContext from "../../context/ProductCatagoryContext";
import TransferContext from "../../context/TransferContext";
import TransferDialog from "./components/Dialog";

export default function Transfer() {
  const [checked, setChecked] = useState([]);
  const [senderStore, setSenderStore] = useState("");
  const [receiverStore, setReceiverStore] = useState("");
  const [catagory, setCatagory] = useState("");
  const [amount, setAmount] = useState("");
  const [dialogOpen, setdDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");

  const { stores, setStores } = useContext(StorePageProvider);
  const { variants, fetchVariants } = useContext(VariantsContext);
  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagoryContext
  );
  const { transferByName } = useContext(TransferContext);

  useEffect(() => {
    fetch("http://localhost:4040/api/store")
      .then((response) => response.json())
      .then((data) => setStores(data));
    // eslint-disable-next-line
  }, []);
  const senderStoreOption = stores.map((store) => ({
    label: `${store.storeLocation}(${store.storeName})`,
    value: store._id,
  }));
  const filteredStore = stores.filter((store) => {
    return store._id !== senderStore;
  });

  const receiverStoreOption = filteredStore.map((store) => ({
    label: `${store.storeLocation}(${store.storeName})`,
    value: store._id,
  }));

  useEffect(() => {
    catagory && fetchVariants();
    // eslint-disable-next-line
  }, [catagory, amount]);

  const senderVariants = variants.filter((variant) => {
    return (
      variant.store === senderStore && variant.productCatagoryId === catagory
    );
  });

  // product catagory fecthing
  useEffect(() => {
    receiverStore && fetchProductCatagories();
    // eslint-disable-next-line
  }, [receiverStore]);

  const receiverProductCatagory = productCatagories.map((productCatagory) => ({
    label: `${productCatagory.productCatagoryName}`,
    value: productCatagory._id,
  }));

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setSelectedVariant(value);
  };

  const handleSenderStore = (e) => {
    setReceiverStore("");
    setCatagory("");
    setSenderStore(e.target.value);
  };
  const handleRecieverStore = (e) => {
    setCatagory("");
    setReceiverStore(e.target.value);
  };

  const handleCatagory = (e) => {
    setCatagory(e.target.value);
  };

  const handleTrasferedamount = (e) => {
    setAmount(e.target.value);
  };

  const transferedVariant = senderVariants.filter((sVariant) => {
    return sVariant._id === checked[0];
  });

  const receiverVariants = variants.filter((variant) => {
    return variant.store === receiverStore;
  });

  const handleDialogOpen = () => {
    setdDialogOpen(true);
  };
  const handleDialogClose = () => {
    setdDialogOpen(false);
  };
  const handleSubmit = () => {
    transferByName(transferedVariant[0], amount, receiverStore);
    setAmount("");
  };

  const customList = (variants) => (
    <Paper sx={{ width: 300, height: 450, overflow: "auto" }}>
      <List dense component="div" role="list">
        {variants.map((variant) => {
          const labelId = `transfer-list-item-${variant._id}-label`;

          return (
            <ListItem
              key={variant.variantName}
              role="listitem"
              onClick={handleToggle(variant.variantName)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selectedVariant === variant.variantName}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${variant.variantName} ${variant.amount}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
  let content = "";
  if (dialogOpen) {
    content = (
      <TransferDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    );
  }
  return (
    <>
      <Box>
        <Typography>Transfer Product</Typography>
        {content}
      </Box>
      <Box sx={{ m: 2 }}>
        {/* sende store */}
        <FormControl sx={{ width: "230px", m: 1 }}>
          <InputLabel id="demo-simple-select-label">Sender Store</InputLabel>

          <Select
            sx={{
              textAlign: "start",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={senderStore}
            name="store"
            label="Sender Store"
            onChange={handleSenderStore}
          >
            {senderStoreOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* receriver store */}
        <FormControl sx={{ width: "230px", m: 1 }}>
          <InputLabel id="demo-simple-select-label">Receiver Store</InputLabel>

          <Select
            sx={{
              textAlign: "start",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={receiverStore}
            name="store"
            label="Receiver Store"
            onChange={handleRecieverStore}
          >
            {receiverStoreOption.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* product catagory */}
        <FormControl sx={{ width: "230px", m: 1 }}>
          <InputLabel id="demo-simple-select-label">Catagory</InputLabel>

          <Select
            sx={{
              textAlign: "start",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={catagory}
            name="store"
            label="Catagory"
            onChange={handleCatagory}
          >
            {receiverProductCatagory.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(senderVariants)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              sx={{ width: 100 }}
              variant="standard"
              value={amount}
              onChange={handleTrasferedamount}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleDialogOpen();
              }}
              disabled={checked.length !== 0 ? false : true}
              aria-label="move all right"
            >
              ≫
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(receiverVariants)}</Grid>
      </Grid>
    </>
  );
}
