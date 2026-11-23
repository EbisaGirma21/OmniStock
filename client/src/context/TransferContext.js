import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { sampleTransfers } from "../data/sampleData";

const TransferContext = createContext();

const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState(sampleTransfers);

  const fetchTransfers = () => {
    setTransfers(sampleTransfers);
  };

  const transferByName = (variant, amounts, receiverStore, senderStore) => {
    const newTransfer = {
      _id: `trf_${Date.now()}`,
      variant,
      amounts,
      receiverStore,
      senderStore,
      createdAt: new Date().toISOString(),
    };
    setTransfers((prev) => [...prev, newTransfer]);
    toast.success("Product transferred successfully");
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
