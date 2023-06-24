import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TransferContext = createContext();

const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransfers = async () => {
    const response = await axios.get("http://localhost:4040/api/transfer");
    setTransfers(response.data);
  };

  const transferByName = async (
    variant,
    amounts,
    receiverStore,
    senderStore
  ) => {
    const response = await axios.patch(
      `http://localhost:4040/api/transfer/`,
      {
        variant,
        amounts,
        store: receiverStore,
        senderStore,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Product transfered successfully");
      fetchTransfers();
    } else if (response.status === 210) {
      toast.warning("Product transfered successfully with warning");
      fetchTransfers();
    } else {
      toast.error("Failed to transfer Product");
    }
  };

  const valueToShare = {
    transfers,
    fetchTransfers,
    transferByName,
  };

  return (
    <TransferContext.Provider value={valueToShare}>
      {children}
    </TransferContext.Provider>
  );
};

export { TransferProvider };

export default TransferContext;
