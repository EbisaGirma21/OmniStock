import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { samplePurchases } from "../data/sampleData";

const PurchasesContext = createContext();

const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState(samplePurchases);

  const fetchPurchases = () => {
    setPurchases(samplePurchases);
  };

  const createPurchase = (purchaser, variant, price, amount) => {
    const newPurchase = {
      _id: `pur_${Date.now()}`,
      purchaser,
      variant,
      price,
      amount,
      createdAt: new Date().toISOString(),
    };
    setPurchases((prev) => [...prev, newPurchase]);
    toast.success("Purchase recorded successfully");
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
