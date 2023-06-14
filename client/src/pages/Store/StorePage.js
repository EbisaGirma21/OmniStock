import React, { useContext } from "react";
import { StyledButton } from "../../components/StyledComponents";
import Modal from "./components/Modal";
import { StorePageProvider } from "../../context/CreateContext";
import Table from "./components/Table";
import { useEffect } from "react";
import AlertDialog from "./components/Dialog";

function Store() {
  const { handleModalOpen, setStores } = useContext(StorePageProvider);


  useEffect(() => {
    fetch("http://localhost:4040/api/store")
      .then((response) => response.json())
      .then((data) => setStores(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <StyledButton
        onClick={handleModalOpen}
        color="primary"
        variant="contained"
      >
        +New
      </StyledButton>
      <Table />
      <Modal />
      <AlertDialog />
    </div>
  );
}

export default Store;
