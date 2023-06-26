import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TransferContext = createContext();

const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransfers = async () => {
    try {
      const response = await axios.get("http://localhost:4040/api/transfer", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          Role: user.role,
        },
      });
      setTransfers(response.data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
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
          Role: user.role,
        },
      }
    );
    if (response.status === 200) {
      if (response.data.reducedVariants[0].amount < 10) {
        toast.warning("Product transfered successfully with warning");
      } else {
        toast.success("Product transfered successfully");
      }
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
