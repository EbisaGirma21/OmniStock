import { useState } from "react";
import { StoreManagerPageProvider } from "../../../context/CreateContext";
import axios from "axios";

function StoreManagerPageLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [storeManagers, setStoreManagers] = useState([]);
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

  const AddNewStoreManager = async (
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    address,
    role,
    store
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4040/api/user",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          gender,
          address,
          role,
          store,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      clearForm();
      fetch("http://localhost:4040/api/user", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setStoreManagers(data));
      const updateStoreManager = [...storeManagers, response.data];
      setStoreManagers(updateStoreManager);
    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
  };

  const handleUpdateModalOpen = (id) => {
    setRowToEdit(id);
    const obj = storeManagers.find((storeManager) => storeManager._id === id);
    formValues.firstName = obj.firstName;
    formValues.lastName = obj.lastName;
    formValues.gender = obj.gender;
    formValues.email = obj.email;
    formValues.phoneNumber = obj.phoneNumber;
    formValues.address = obj.address;
    formValues.role = obj.role;
    formValues.store = obj.store;
    handleModalOpen();
  };

  const updateStoreManager = async (editedRow) => {
    await axios.patch(
      `http://localhost:4040/api/user/${rowToEdit}`,
      {
        editedRow,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    fetch("http://localhost:4040/api/user", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStoreManagers(data));

    handleModalClose();
  };

  const handleDeleteDialogOpen = (id) => {
    setRowToDelete(id);
    setOpenDialog(true);
  };

  const deleteStoreManager = async () => {
    await axios.delete(`http://localhost:4040/api/user/${rowToDelete}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const updatedStoreManagers = storeManagers.filter((storeManager) => {
      return storeManager._id !== rowToDelete;
    });
    setStoreManagers(updatedStoreManagers);
    handleDialogClose();
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
