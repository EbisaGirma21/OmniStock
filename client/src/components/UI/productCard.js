import { Avatar, Card, CardHeader,  Typography } from "@mui/material";
import { Link } from "react-router-dom";
import f1 from "../../assets/f1.jpg";

const ProductCard = ({ product }) => {
  return (
    <Card className="border-2 w-full p-3">
      <CardHeader
        avatar={<Avatar>{product.brand[0]}</Avatar>}
        title={product.brand}
        className=""
      />
      <img src={f1} alt=""/>
      <Typography className="mt-2">
        <Link to="#">{product.name} </Link>
      </Typography>
      <Typography className="mt-2">See more</Typography>
    </Card>
  );
};

export default ProductCard;
