import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import RequestsContext from "../../../context/RequestContext";
import styled from "@emotion/styled";

// style for selected row
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .stored-request-row": {
    backgroundColor: "#EDE7F6",
  },
}));

function RequestTable() {
  const { requests, fetchRequests } = useContext(RequestsContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const columns = [
    ...(user.role === "admin" || user.role === "super"
      ? [
          {
            field: "storeName",
            headerName: "Store",
            width: 190,
            key: "RequestrColumn",
          },
        ]
      : []),
    { field: "productCatagory", headerName: "Product category", width: 150 },
    { field: "product", headerName: "Product", width: 130 },
    { field: "brand", headerName: "Brand", width: 70 },
    { field: "modelName", headerName: "Model", width: 190 },
    { field: "requestType", headerName: "Request Type", width: 130 },
    { field: "requestStatus", headerName: "Status", width: 130 },
    ...(user.role === "admin" || user.role === "super"
      ? [
          {
            field: "requesterName",
            headerName: "Requester",
            width: 250,
            key: "RequesterColumn",
          },
        ]
      : []),
  ];

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let requestByStore = [];
  if (user.role === "sm") {
    requestByStore = requests.filter((request) => {
      return request.store === user.store;
    });
  } else {
    requestByStore = requests;
  }

  const tableRows = Array.isArray(requestByStore)
    ? requestByStore
    : [requestByStore];

  const getRowClassName = (params) => {
    const rowId = params.row._id;
    const requestId = localStorage.getItem("requestId");
    const isStoredRequest = requestId && requestId === rowId;
    return isStoredRequest ? "stored-request-row" : "";
  };

  return (
    <StyledDataGrid
      sx={{ width: "fit-content" }}
      rows={tableRows}
      columns={columns}
      key={requestByStore._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      getRowId={(row) => row._id || requestByStore.indexOf(row)}
      pageSizeOptions={[5, 10]}
      getRowClassName={getRowClassName}
      onRowClick={() => localStorage.removeItem("requestId")}
    />
  );
}

export default RequestTable;
