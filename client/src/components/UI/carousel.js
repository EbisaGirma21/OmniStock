import Carousel from "react-material-ui-carousel";
import Item from "./item";
import store from "../../assets/b16.jpg";
export default function Example(props) {
  var items = [
    {
      name: store,
      description:
        "Welcome to our store, where you can shop from the comfort of your own home and find everything you need in just a few clicks!",
    },
    {
      name: store,
      description:
        "Don't miss out on our amazing deals - come visit us in-store today!",
    },
    {
      name: store,
      description:
        "Hurry in and take advantage of our store's limited-time promotions! Don't miss out on the savings.",
    },
    {
      name: store,
      description:
        "Experience the best shopping experience with us! Our store is offering exclusive deals you won't find anywhere else.",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
