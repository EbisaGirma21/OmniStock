import { createContext, useState } from "react";
import axios from "axios";

const ProductCatagorysContext = createContext();

const ProductCatagoryProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [productCatagories, setProductCatagories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchProductCatagories = async () => {
    const response = await axios.get(
      "http://localhost:4040/api/productCatagory"
    );

    setProductCatagories(response.data);
  };

  const editProductCatagoryById = async (
    id,
    newproductCatagoryName,
    newProductNames
  ) => {
    const response = await axios.patch(
      `http://localhost:4040/api/productCatagory/${id}`,
      {
        productCatagoryName: newproductCatagoryName,
        productNames: newProductNames,
      }
    );

    const updatedProductCatagorys = productCatagories.map((productCatagory) => {
      if (productCatagory.id === id) {
        return { ...productCatagory, ...response.data };
      }
      return productCatagory;
    });
    fetchProductCatagories();
    setProductCatagories(updatedProductCatagorys);
  };

  const deleteProductCatagoryById = async (id) => {
    await axios.delete(`http://localhost:4040/api/productCatagory/${id}`);

    const updatedProductCatagorys = productCatagories.filter(
      (productCatagory) => {
        return productCatagory.id !== id;
      }
    );
    fetchProductCatagories();
    setProductCatagories(updatedProductCatagorys);
  };

  const createProductCatagory = async (
    productCatagoryName,
    image,
    store,
    productNames
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:4040/api/productCatagory",
        {
          method: "POST",
          body: JSON.stringify({
            productCatagoryName,
            image,
            store,
            productNames,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        return false;
      } else {
        fetchProductCatagories();
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      return false;
    }
  };

  const valueToShare = {
    error,
    isLoading,
    productCatagories,
    deleteProductCatagoryById,
    editProductCatagoryById,
    createProductCatagory,
    fetchProductCatagories,
  };

  return (
    <ProductCatagorysContext.Provider value={valueToShare}>
      {children}
    </ProductCatagorysContext.Provider>
  );
};

export { ProductCatagoryProvider };

export default ProductCatagorysContext;
