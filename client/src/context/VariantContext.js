import { createContext, useState } from "react";
import axios from "axios";

const VariantsContext = createContext();

const VariantProvider = ({ children }) => {
  const [variants, setVariants] = useState([]);

  const fetchVariants = async () => {
    const response = await axios.get("http://localhost:4040/api/variant");
    setVariants(response.data);
  };

  const editVariantById = async (id, newvariantName) => {
    const response = await axios.patch(
      `http://localhost:4040/api/variant/${id}`,
      {
        variantName: newvariantName,
      }
    );

    const updatedVariants = variants.map((variant) => {
      if (variant.id === id) {
        return { ...variant, ...response.data };
      }
      return variant;
    });
    fetchVariants();
    setVariants(updatedVariants);
  };

  const deleteVariantById = async (id) => {
    await axios.delete(`http://localhost:4040/api/variant/${id}`);

    const updatedVariants = variants.filter((variant) => {
      return variant.id !== id;
    });
    fetchVariants();
    setVariants(updatedVariants);
  };
  const createVariant = async (
    productName,
    brandName,
    modelName,
    variantName,
    images,
    sizes,
    colors,
    price,
    amount,
    condition,
    gender,
    shortDescription,
    store,
    productCatagory
  ) => {
    const response = await axios.post("http://localhost:4040/api/variant", {
      productName,
      brandName,
      modelName,
      variantName,
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
    });

    const updatedVariants = [...variants, response.data];
    setVariants(updatedVariants);
  };
  const valueToShare = {
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
