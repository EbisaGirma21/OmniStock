import { createContext, useState } from "react";
import axios from "axios";

const PurchasesContext = createContext();

const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    const response = await axios.get("http://localhost:4040/api/purchase");
    setPurchases(response.data);
  };

  const createPurchase = async (purchaser, variant, price, amount) => {
    const response = await axios.post("http://localhost:4040/api/purchase", {
      purchaser,
      variant,
      price,
      amount,
    });

    const updatedPurchases = [...purchases, response.data];
    setPurchases(updatedPurchases);
  };
  const valueToShare = {
    purchases,
    createPurchase,
    fetchPurchases,
  };

  return (
    <PurchasesContext.Provider value={valueToShare}>
      {children}
    </PurchasesContext.Provider>
  );
};

export { PurchaseProvider };

export default PurchasesContext;
