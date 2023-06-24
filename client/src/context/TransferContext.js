import { createContext, useState } from "react";
import axios from "axios";

const TransferContext = createContext();

const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);

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
    const response = await axios.patch(`http://localhost:4040/api/transfer/`, {
      variant,
      amounts,
      store: receiverStore,
      senderStore,
    });

    fetchTransfers();
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
