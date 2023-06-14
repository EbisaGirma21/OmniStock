import ProductList from "./productList";
import Banner from "../../components/UI/banner";
import Example from "../../components/UI/carousel";
import Service from "../../components/UI/Service";
import Footer from "../../components/UI/footer";
import NavBar from "../../components/UI/navbar";

const Home = () => {
  return (
    <container>
      <header>
        <NavBar isLogin={false} />
        <Example />
      </header>
      <body>
        <ProductList
          url=" http://localhost:3001/product"
          title="Featured Products"
        />
        <Service />
        <Banner />
        <ProductList
          url=" http://localhost:3001/newarrival"
          title="New arrivals"
        />
      </body>
      <Footer />
    </container>
  );
};

export default Home;
