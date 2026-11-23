import { useState } from "react";
import { StoreManagerPageProvider } from "../../../context/CreateContext";
import { toast } from "react-toastify";
import { sampleUsers } from "../../../data/sampleData";

function StoreManagerPageLayout({ children }) {
  const [storeManagers, setStoreManagers] = useState(sampleUsers);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    store: "",
    role: "",
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
    formValues.firstName = "";
    formValues.lastName = "";
    formValues.gender = "";
    formValues.email = "";
    formValues.phoneNumber = "";
    formValues.address = "";
    formValues.role = "";
    formValues.store = "";
  };

  const AddNewStoreManager = (
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    role,
    store,
  ) => {
    const newUser = {
      _id: `user_${Date.now()}`,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      address,
      role,
      store,
      isActive: true,
    };
    setStoreManagers((prev) => [...prev, newUser]);
    clearForm();
    setOpenModal(false);
    toast.success("User successfully created.");
  };

  const handleUpdateModalOpen = (id) => {
    setRowToEdit(id);
    const obj = storeManagers.find((sm) => sm._id === id);
    formValues.firstName = obj.firstName || obj.name?.split(" ")[0] || "";
    formValues.lastName = obj.lastName || obj.name?.split(" ")[1] || "";
    formValues.gender = obj.gender || "";
    formValues.email = obj.email;
    formValues.phoneNumber = obj.phoneNumber || "";
    formValues.address = obj.address || "";
    formValues.role = obj.role;
    formValues.store = obj.store;
    handleModalOpen();
  };

  const updateStoreManager = (editedRow) => {
    setStoreManagers((prev) =>
      prev.map((sm) => (sm._id === rowToEdit ? { ...sm, ...editedRow } : sm)),
    );
    handleModalClose();
    toast.info("User updated successfully");
  };

  const handleDeleteDialogOpen = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const deleteStoreManager = () => {
    setStoreManagers((prev) => prev.filter((sm) => sm._id !== rowToDelete));
    handleDialogClose();
    toast.warning("User deleted successfully");
  };

  const valueToshare = {
    storeManagers,
    setStoreManagers,
    openModal,
    handleModalOpen,
    handleModalClose,
    AddNewStoreManager,
    deleteStoreManager,
    setFormValues,
    formValues,
    updateStoreManager,
    setRowToEdit,
    rowToEdit,
    handleUpdateModalOpen,
    openDialog,
    handleDeleteDialogOpen,
    handleDialogClose,
    rowToDelete,
  };

  return (
    <StoreManagerPageProvider.Provider value={valueToshare}>
      {children}
    </StoreManagerPageProvider.Provider>
  );
}

export default StoreManagerPageLayout;
