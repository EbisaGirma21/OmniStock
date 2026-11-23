import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { sampleSells } from "../data/sampleData";

const SellsContext = createContext();

const SellProvider = ({ children }) => {
  const [sells, setSells] = useState(sampleSells);

  const fetchSells = () => {
    setSells(sampleSells);
  };

  const createSell = (seller, variant, price, amount) => {
    const newSell = {
      _id: `sell_${Date.now()}`,
      seller,
      variant,
      price,
      amount,
      createdAt: new Date().toISOString(),
    };
    setSells((prev) => [...prev, newSell]);
    toast.success("Sale recorded successfully");
  };

  const valueToShare = {
    sells,
    createSell,
    fetchSells,
  };

  return (
    <SellsContext.Provider value={valueToShare}>
      {children}
    </SellsContext.Provider>
  );
};

export { SellProvider };

export default SellsContext;
