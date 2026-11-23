import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { sampleProductCatagories } from "../data/sampleData";

const ProductCatagorysContext = createContext();

const ProductCatagoryProvider = ({ children }) => {
  const [productCatagories, setProductCatagories] = useState(
    sampleProductCatagories,
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductCatagories = () => {
    // Data is already loaded from sampleData
    setProductCatagories(sampleProductCatagories);
  };

  const editProductCatagoryById = (
    id,
    newproductCatagoryName,
    newProductNames,
  ) => {
    setIsLoading(true);
    setProductCatagories((prev) =>
      prev.map((cat) =>
        cat._id === id
          ? {
              ...cat,
              productCatagoryName: newproductCatagoryName,
              productNames: newProductNames,
            }
          : cat,
      ),
    );
    setIsLoading(false);
    toast.info("Product Category updated successfully");
    return true;
  };

  const deleteProductCatagoryById = (id) => {
    setProductCatagories((prev) => prev.filter((cat) => cat._id !== id));
    toast.warning("Product Category deleted successfully");
  };

  const createProductCatagory = (productCatagoryName, image, productNames) => {
    setIsLoading(true);
    const newCat = {
      _id: `cat_${Date.now()}`,
      productCatagoryName,
      image: image || {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      },
      productNames: productNames || [],
    };
    setProductCatagories((prev) => [...prev, newCat]);
    setIsLoading(false);
    toast.success("Product Category created successfully");
    return true;
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
