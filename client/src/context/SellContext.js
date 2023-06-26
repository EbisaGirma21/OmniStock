import { createContext, useState } from "react";
import axios from "axios";

const SellsContext = createContext();

const SellProvider = ({ children }) => {
  const [sells, setSells] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));


  const fetchSells = async () => {
    const response = await axios.get("http://localhost:4040/api/sell",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
        Role: user.role,
      },
    });
    setSells(response.data);
  };

  const createSell = async (seller, variant, price, amount) => {
    const response = await axios.post(
      "http://localhost:4040/api/sell",
      {
        seller,
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

    const updatedSells = [...sells, response.data];
    setSells(updatedSells);
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
