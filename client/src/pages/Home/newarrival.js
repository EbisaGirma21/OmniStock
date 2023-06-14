import { useEffect, useState } from "react";

import ProductsList from "./productsList";

const NewArrivals = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl mt-16">New Arrivals</h1>
      <p>Summer Collection New Modern Design</p>
      {products && <ProductsList products={products} />}
    </div>
  );
};

export default NewArrivals;
