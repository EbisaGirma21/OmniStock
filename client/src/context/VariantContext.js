import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { sampleVariants } from "../data/sampleData";

const VariantsContext = createContext();

const VariantProvider = ({ children }) => {
  const [variants, setVariants] = useState(sampleVariants);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVariants = () => {
    // Data is already loaded from sampleData — no-op
  };

  const editVariantById = (
    id,
    newProductName,
    newBrandName,
    newModelName,
    newSizes,
    newColors,
    newPrice,
    newAmount,
    newCondition,
    newGender,
    newShortDescription,
  ) => {
    setIsLoading(true);
    setVariants((prev) =>
      prev.map((v) =>
        v._id === id
          ? {
              ...v,
              productName: newProductName,
              brandName: newBrandName,
              modelName: newModelName,
              sizes: newSizes,
              colors: newColors,
              price: newPrice,
              amount: newAmount,
              condition: newCondition,
              gender: newGender,
              shortDescription: newShortDescription,
            }
          : v,
      ),
    );
    setIsLoading(false);
    toast.info("Product updated successfully");
    return true;
  };

  const deleteVariantById = (id) => {
    setVariants((prev) => prev.filter((v) => v._id !== id));
    toast.warning("Product deleted successfully");
  };

  const createVariant = (
    productName,
    brandName,
    modelName,
    images,
    sizes,
    colors,
    price,
    amount,
    condition,
    gender,
    shortDescription,
    store,
    productCatagory,
  ) => {
    setIsLoading(true);
    const newVariant = {
      _id: `var_${Date.now()}`,
      variantName: `${brandName} ${modelName}`,
      productName,
      brandName,
      modelName,
      images:
        images && images.length > 0
          ? images
          : [
              {
                _id: "img_default",
                url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
              },
            ],
      sizes,
      colors,
      price,
      amount,
      condition,
      gender,
      shortDescription,
      store,
      productCatagory,
    };
    setVariants((prev) => [...prev, newVariant]);
    setIsLoading(false);
    toast.success("Product created successfully");
    return true;
  };

  const valueToShare = {
    error,
    isLoading,
    variants,
    deleteVariantById,
    editVariantById,
    createVariant,
    fetchVariants,
  };

  return (
    <VariantsContext.Provider value={valueToShare}>
      {children}
    </VariantsContext.Provider>
  );
};

export { VariantProvider };

export default VariantsContext;
