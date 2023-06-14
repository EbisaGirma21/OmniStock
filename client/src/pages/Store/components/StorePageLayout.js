import { useState } from "react";
import { StorePageProvider } from "../../../context/CreateContext";
import axios from "axios";

function StorePageLayout({ children }) {
  const [stores, setStores] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [formValues, setFormValues] = useState({
    storeName: "",
    storeLocation: "",
    productAmount: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  
  const handleModalClose = () => {
    setOpenModal(!openModal);
    setRowToEdit(null);
    clearForm();
  };
  
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRowToDelete(null);
  };

  const clearForm = () => {
    formValues.storeName = "";
    formValues.storeLocation = "";
    formValues.productAmount = "";
  };

  const AddNewStore = async (storeName, storeLocation) => {
    try {
      const response = await axios.post("http://localhost:4040/api/store", {
        storeName,
        storeLocation,
      });
      clearForm();
      fetch("http://localhost:4040/api/store")
        .then((response) => response.json())
        .then((data) => setStores(data));
      const updatedStores = [...stores, response.data];
      setStores(updatedStores);
    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
  };

  const handleUpdateModalOpen = (id) => {
    setRowToEdit(id);
    const obj = stores.find((store) => store._id === id);
    formValues.storeName = obj.storeName;
    formValues.storeLocation = obj.storeLocation;
    // formValues.productAmount = obj.productAmount;
    handleModalOpen();
  };

  const updateStore = async (editedRow) => {
    await axios.patch(
      `http://localhost:4040/api/store/${rowToEdit}`,
      {
        method: "PATCH",
        body: editedRow,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    fetch("http://localhost:4040/api/store")
      .then((response) => response.json())
      .then((data) => setStores(data));
    handleModalClose();
  };

  const handleDeleteDialogOpen = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const deleteStore = async() => {
    await axios.delete(`http://localhost:4040/api/store/${rowToDelete}`);

    const updatedStores = stores.filter((store) => {
      return store._id !== rowToDelete;
    });
    setStores(updatedStores);
    handleDialogClose();
  };

  const valueToshare = {
    openModal,
    handleModalClose,
    handleModalOpen,
    setFormValues,
    formValues,
    stores,
    setStores,
    openDialog,
    deleteStore,
    AddNewStore,
    handleDialogClose,
    handleUpdateModalOpen,
    handleDeleteDialogOpen,
    updateStore,
    setRowToEdit,
    rowToEdit,
    rowToDelete,

  };

  return (
    <StorePageProvider.Provider value={valueToshare}>
      {children}
    </StorePageProvider.Provider>
  );
}

export default StorePageLayout;
