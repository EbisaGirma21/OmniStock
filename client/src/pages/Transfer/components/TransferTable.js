import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import TransfersContext from "../../../context/TransferContext";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function TransferTable() {
  const { transfers, fetchTransfers } = useContext(TransfersContext);
  const columns = [
    { field: "sender", headerName: "Sender Store", width: 190 },
    { field: "receiver", headerName: "Receiver Store", width: 190 },
    { field: "productCatagoryName", headerName: "Catagory", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "brandName", headerName: "Brand Name", width: 150 },
    { field: "modelName", headerName: "Model Name", width: 150 },
    { field: "amount", headerName: "Transfered Amount", width: 150 },
  ];

  useEffect(() => {
    fetchTransfers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableRows = Array.isArray(transfers) ? transfers : [transfers];
  return (
    <DataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      key={transfers._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || transfers.indexOf(row)}
      pageSizeOptions={[5, 10]}
      slots={{
        toolbar: CustomToolbar,
      }}
    />
  );
}

export default TransferTable;
