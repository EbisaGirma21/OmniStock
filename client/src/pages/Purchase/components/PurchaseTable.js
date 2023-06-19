import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import PurchasesContext from "../../../context/PurchaseContext";

function PurchaseTable() {
  const { purchases, fetchPurchases } = useContext(PurchasesContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const columns = [
    ...(user.role === "admin" || user.role === "super"
      ? [
          {
            field: "storeName",
            headerName: "Store",
            width: 190,
            key: "PurchaserColumn",
          },
        ]
      : []),
    { field: "productCatagory", headerName: "Product catagory", width: 150 },
    { field: "product", headerName: "Product", width: 130 },
    { field: "brand", headerName: "Brand", width: 70 },
    { field: "model", headerName: "Model", width: 190 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "price", headerName: "Unit Price", width: 130 },
    ...(user.role === "admin" || user.role === "super"
      ? [
          {
            field: "purchaserName",
            headerName: "Purchaser",
            width: 250,
            key: "PurchaserColumn",
          },
        ]
      : []),
  ];

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let purchaseByStore = [];
  if (user.role === "sm") {
    purchaseByStore = purchases.filter((purchase) => {
      return purchase.store === user.store;
    });
  } else {
    purchaseByStore = purchases;
  }

  const tableRows = Array.isArray(purchaseByStore)
    ? purchaseByStore
    : [purchaseByStore];
  return (
    <DataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      key={purchaseByStore._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || purchaseByStore.indexOf(row)}
      pageSizeOptions={[5, 10]}
    />
  );
}

export default PurchaseTable;
