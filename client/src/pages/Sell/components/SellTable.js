import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import SellsContext from "../../../context/SellContext";

function SellTable() {
  const { sells, fetchSells } = useContext(SellsContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const columns = [
    ...(user.role === "admin" || user.role === "super"
      ? [
          {
            field: "storeName",
            headerName: "Store",
            width: 190,
            key: "SellerColumn",
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
            field: "sellerName",
            headerName: "Seller",
            width: 250,
            key: "SellerColumn",
          },
        ]
      : []),
  ];

  useEffect(() => {
    fetchSells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let sellByStore = [];
  if (user.role === "sm") {
    sellByStore = sells.filter((sell) => {
      return sell.store === user.store;
    });
  } else {
    sellByStore = sells;
  }
  const tableRows = Array.isArray(sellByStore) ? sellByStore : [sellByStore];
  return (
    <DataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      key={sellByStore._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || sellByStore.indexOf(row)}
      pageSizeOptions={[5, 10]}
    />
  );
}

export default SellTable;
