import { createContext, useState } from "react";
import axios from "axios";

const CatagoryContext = createContext();

const CatagoryProvider = ({ children }) => {
  const [catagories, setCatagories] = useState([]);

  const fetchCatagories = async () => {
    const response = await axios.get("http://localhost:3001/catagories");

    setCatagories(response.data);
  };

  const editCatagoryById = async (id, newCatagoryTypeName) => {
    const response = await axios.put(`http://localhost:3001/catagories/${id}`, {
      catagoryTypeName: newCatagoryTypeName,
    });

    const updatedCatagories = catagories.map((catagory) => {
      if (catagory.id === id) {
        return { ...catagory, ...response.data };
      }

      return catagory;
    });

    setCatagories(updatedCatagories);
  };

  const deleteCatagoryById = async (id) => {
    await axios.delete(`http://localhost:3001/catagories/${id}`);

    const updatedCatagories = catagories.filter((catagory) => {
      return catagory.id !== id;
    });

    setCatagories(updatedCatagories);
  };
  const createCatagory = async (catagoryTypeName, imageUrl) => {
    const response = await axios.post("http://localhost:3001/catagories", {
      catagoryTypeName,
      imageUrl, // add the image URL as a property in the request body
    });
  
    const updatedCatagories = [...catagories, response.data];
    setCatagories(updatedCatagories);
  };
  const valueToShare = {
    catagories,
    deleteCatagoryById,
    editCatagoryById,
    createCatagory,
    fetchCatagories,
  };

  return (
    <CatagoryContext.Provider value={valueToShare}>
      {children}
    </CatagoryContext.Provider>
  );
};

export { CatagoryProvider };

export default CatagoryContext;
