import { createContext, useState } from "react";
import axios from "axios";

const PurchasesContext = createContext();

const PurchaseProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPurchases = async () => {
    const response = await axios.get("http://localhost:4040/api/purchase", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        Role: user.role,
      },
    });
    setPurchases(response.data);
  };

  const createPurchase = async (purchaser, variant, price, amount) => {
    const response = await axios.post(
      "http://localhost:4040/api/purchase",
      {
        purchaser,
        variant,
        price,
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
          Role: user.role,
        },
      }
    );

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
