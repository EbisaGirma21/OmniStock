import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Store from "./pages/Store/StorePage";
import StoreManagerPageLayout from "./pages//User/components/StoreManagerPageLayout";
import StorePageLayout from "./pages//Store/components/StorePageLayout";
import UserManagment from "./pages/User/StoreManagerPage";
import Admin from "./pages/Admin/Admin";
import { useContext } from "react";
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

function App() {
  const { user } = useContext(AuthContext);
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
                  <Dashboard />
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
              path="transfer"
              element={
                <StorePageLayout>
                  <ProductCatagoryProvider>
                    <VariantProvider>
                      <TransferProvider>
                        <Transfer />
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
                      <VariantProvider>
                        <Variant />
                      </VariantProvider>
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
                    <Store />
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
                        <VariantProvider>
                          <Variant />
                        </VariantProvider>
                      </PurchaseProvider>
                    </SellProvider>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
