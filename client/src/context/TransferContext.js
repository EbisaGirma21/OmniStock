import { createContext } from "react";
import axios from "axios";

const TransferContext = createContext();

const TransferProvider = ({ children }) => {
  const transferByName = async (variant, amount, store) => {
    const response = await axios.patch(`http://localhost:4040/api/transfer/`, {
      variant,
      amount,
      store,
    });
  };

  const valueToShare = {
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
