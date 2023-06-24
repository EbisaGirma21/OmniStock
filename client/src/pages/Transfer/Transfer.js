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
  IconButton,
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
import ClearIcon from "@mui/icons-material/Clear";
import { Cancel } from "@mui/icons-material";
import TransferTable from "./components/TransferTable";

export default function Transfer() {
  const [checked, setChecked] = useState([]);
  const [senderStore, setSenderStore] = useState("");
  const [receiverStore, setReceiverStore] = useState("");
  const [catagory, setCatagory] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [dialogOpen, setdDialogOpen] = useState(false);
  const [checkedVariant, setCheckedVariant] = useState([]);

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
  }, [catagory, amounts]);

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

  // check controller
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    const filteredVariants = variants.filter((variant) => {
      return newChecked.includes(variant._id);
    });

    setCheckedVariant(filteredVariants);
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

  const handleTrasferedamount = (event, variantIndex) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[variantIndex] = event.target.value;
    setAmounts(updatedAmounts);
  };

  const receiverVariants = variants.filter((variant) => {
    return (
      variant.store === receiverStore && variant.productCatagoryId === catagory
    );
  });

  const handleDialogOpen = () => {
    setdDialogOpen(true);
  };
  const handleDialogClose = () => {
    setdDialogOpen(false);
  };
  const handleSubmit = () => {
    transferByName(checkedVariant, amounts, receiverStore, senderStore);
    fetchVariants();
    setAmounts([]);
    setCheckedVariant([]);
    setChecked([]);
  };

  const customList = (variants) => (
    <Paper sx={{ width: 600, height: 500, overflow: "auto" }}>
      <List dense component="div" role="list">
        {variants.map((variant) => {
          const labelId = `transfer-list-item-${variant._id}-label`;

          return (
            <ListItem
              className=" cursor-pointer"
              key={variant._id}
              role="listitem"
              onClick={
                variant.store === senderStore ? handleToggle(variant._id) : null
              }
            >
              <ListItemIcon>
                {variant.store === senderStore && (
                  <Checkbox
                    checked={checked.indexOf(variant._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText id={labelId}>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Name: </Typography>
                  <Typography>{variant.modelName}</Typography>

                  <Typography sx={{ fontWeight: "bold", ml: 4 }}>
                    Amount:
                  </Typography>
                  <Typography>{variant.amount}</Typography>
                </Box>
              </ListItemText>
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
      <Grid container spacing={2} justifyContent="center">
        <Grid item>{customList(senderVariants)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            {checkedVariant.length !== 0 ? (
              checkedVariant.map((variant, index) => {
                const amount = amounts[index] || "";
                return (
                  <Box
                    className="focus:outline-none border-2 p-1 m-1 w-72 bg-white"
                    key={variant._id}
                  >
                    <Box className="w-full flex justify-between">
                      {variant.modelName}
                      <Typography className=" text-green-500">{`${variant.price} ETB`}</Typography>
                      <IconButton className="w-6 h-6">
                        <Cancel onClick={handleToggle(variant._id)} />
                      </IconButton>
                    </Box>
                    <Box className="flex justify-between">
                      <img
                        src={variant.images[0].url}
                        style={{
                          objectFit: "cover",
                          overflow: "hidden",
                        }}
                        className="w-1/5"
                        alt="img"
                      />
                      <TextField
                        margin="dense"
                        label="Amount"
                        type="number"
                        sx={{ width: 100 }}
                        variant="standard"
                        value={amount}
                        onChange={(event) =>
                          handleTrasferedamount(event, index)
                        }
                      />
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="p-1 m-1 flex w-72 items-center"></Box>
            )}
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
      <Box className="m-4">
        <TransferTable />
      </Box>
    </>
  );
}
