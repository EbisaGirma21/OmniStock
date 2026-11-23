import { useState } from "react";
import { StorePageProvider } from "../../../context/CreateContext";
import { toast } from "react-toastify";
import { sampleStores } from "../../../data/sampleData";

function StorePageLayout({ children }) {
  const [stores, setStores] = useState(sampleStores);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [formValues, setFormValues] = useState({
    storeName: "",
    storeLocation: "",
    productAmount: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
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

  const AddNewStore = (storeName, storeLocation) => {
    setIsLoading(true);
    const newStore = {
      _id: `store_${Date.now()}`,
      storeName,
      storeLocation,
      productAmount: 0,
      isActive: true,
    };
    setStores((prev) => [...prev, newStore]);
    clearForm();
    setOpenModal(false);
    setIsLoading(false);
    toast.success("Store created successfully");
    return true;
  };

  const handleUpdateModalOpen = (id) => {
    setRowToEdit(id);
    const obj = stores.find((store) => store._id === id);
    formValues.storeName = obj.storeName;
    formValues.storeLocation = obj.storeLocation;
    handleModalOpen();
  };

  const updateStore = (editedRow) => {
    setStores((prev) =>
      prev.map((s) => (s._id === rowToEdit ? { ...s, ...editedRow } : s)),
    );
    handleModalClose();
    toast.info("Store updated successfully");
    return true;
  };

  const handleDeleteDialogOpen = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const deleteStore = () => {
    setStores((prev) => prev.filter((s) => s._id !== rowToDelete));
    handleDialogClose();
    toast.warning("Store deleted successfully");
  };

  const valueToshare = {
    error,
    isLoading,
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
