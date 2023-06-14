import { useEffect, useState } from "react";
import ProductCard from "../../components/UI/productCard";
import { Container, Grid, Typography } from "@mui/material";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(props.url).then((res) =>
      res.json().then((data) => setProducts(data))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-10 py-5">
      <Typography className="text-center mb-16">{props.title}</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={3} sm={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
