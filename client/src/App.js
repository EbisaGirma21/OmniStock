import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Store from "./pages/Store/StorePage";
import StoreManagerPageLayout from "./pages//User/components/StoreManagerPageLayout";
import StorePageLayout from "./pages//Store/components/StorePageLayout";
import UserManagment from "./pages/User/StoreManagerPage";
import Admin from "./pages/Admin/Admin";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import ProductCatagory from "./pages/ProductCatagory/ProductCatagory";
import { ProductCatagoryProvider } from "./context/ProductCatagoryContext";
import { VariantProvider } from "./context/VariantContext";
import Variant from "./pages/Variant/Variant";
import { SellProvider } from "./context/SellContext";
import Sell from "./pages/Sell/Sell";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transfer from "./pages/Transfer/Transfer";
import { TransferProvider } from "./context/TransferContext";
import { PurchaseProvider } from "./context/PurchaseContext";
import Purchase from "./pages/Purchase/Purchase";
import { RequestProvider } from "./context/RequestContext";
import Request from "./pages/Request/Request";
import { Box, Button } from "@mui/material";
import Product from "./pages/Home/components/Product";
import ProductDetail from "./pages/Home/components/ProductDetail";

function App() {
  const { user } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsVisible(scrollTop > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ProtectedRouteAdmin = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role === "super" || user.role === "admin") {
      return children;
    }
    return <Navigate to="/login" />;
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Box>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            background: "#4CCEAC",
            color: "#fff",
            width: "50px",
            height: "90px",
            "&:hover": {
              bottom: "28px",
              marginBottom: "28px",
              background: "#4CCEAC",
              transition: "ease-in-out 0.7s",
            },
          }}
        >
          ↑
        </Button>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProductCatagoryProvider>
                  <VariantProvider>
                    <Home />
                  </VariantProvider>
                </ProductCatagoryProvider>
              }
            />
            <Route path=":product">
              <Route
                index
                element={
                  <VariantProvider>
                    <Product />
                  </VariantProvider>
                }
              />
              <Route
                path=":detail"
                element={
                  <VariantProvider>
                    <ProductDetail />
                  </VariantProvider>
                }
              />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StorePageLayout>
                  <Layout />
                </StorePageLayout>
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                user && (user.role === "super" || user.role === "admin") ? (
                  <VariantProvider>
                    <SellProvider>
                      <RequestProvider>
                        <Dashboard />
                      </RequestProvider>
                    </SellProvider>
                  </VariantProvider>
                ) : (
                  <Admin />
                )
              }
            />
            <Route
              path="sell"
              element={
                <SellProvider>
                  <Sell />
                </SellProvider>
              }
            />
            <Route
              path="purchase"
              element={
                <PurchaseProvider>
                  <Purchase />
                </PurchaseProvider>
              }
            />
            <Route
              path="request"
              element={
                <RequestProvider>
                  <Request />
                </RequestProvider>
              }
            />
            <Route
              path="transfer"
              element={
                <StorePageLayout>
                  <ProductCatagoryProvider>
                    <VariantProvider>
                      <TransferProvider>
                        <ProtectedRouteAdmin>
                          <Transfer />
                        </ProtectedRouteAdmin>
                      </TransferProvider>
                    </VariantProvider>
                  </ProductCatagoryProvider>
                </StorePageLayout>
              }
            />
            <Route path="productCatagory">
              <Route
                index
                element={
                  <ProductCatagoryProvider>
                    <ProductCatagory />
                  </ProductCatagoryProvider>
                }
              />
              <Route
                path=":variant"
                element={
                  <SellProvider>
                    <PurchaseProvider>
                      <ProductCatagoryProvider>
                        <VariantProvider>
                          <Variant />
                        </VariantProvider>
                      </ProductCatagoryProvider>
                    </PurchaseProvider>
                  </SellProvider>
                }
              />
            </Route>
            <Route
              path="user"
              element={
                <ProtectedRouteAdmin>
                  <StoreManagerPageLayout>
                    <StorePageLayout>
                      <UserManagment />
                    </StorePageLayout>
                  </StoreManagerPageLayout>
                </ProtectedRouteAdmin>
              }
            />
            <Route path="store">
              <Route
                index
                element={
                  <StorePageLayout>
                    <ProtectedRouteAdmin>
                      <Store />
                    </ProtectedRouteAdmin>
                  </StorePageLayout>
                }
              />
              <Route path=":productCatagory">
                <Route
                  index
                  element={
                    <ProductCatagoryProvider>
                      <ProductCatagory />
                    </ProductCatagoryProvider>
                  }
                />
                <Route
                  path=":variant"
                  element={
                    <SellProvider>
                      <PurchaseProvider>
                        <ProductCatagoryProvider>
                          <VariantProvider>
                            <Variant />
                          </VariantProvider>
                        </ProductCatagoryProvider>
                      </PurchaseProvider>
                    </SellProvider>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ width: "450px", right: "120px" }}
      />
    </Box>
  );
}

export default App;
