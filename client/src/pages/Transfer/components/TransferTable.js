import { useContext, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import TransfersContext from "../../../context/TransferContext";
import { generatePDF } from "./PdfGenerator";

function CustomToolbar({ exportToPDF }) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport onClick={exportToPDF} />
    </GridToolbarContainer>
  );
}

function TransferTable() {
  const { transfers, fetchTransfers } = useContext(TransfersContext);
  const columns = [
    { field: "sender", headerName: "Sender Store", width: 190 },
    { field: "receiver", headerName: "Receiver Store", width: 190 },
    { field: "productCatagoryName", headerName: "Category", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "brandName", headerName: "Brand Name", width: 150 },
    { field: "modelName", headerName: "Model Name", width: 150 },
    { field: "amount", headerName: "Transferred Amount", width: 150 },
    { field: "createdAt", headerName: "Transfer Date", width: 150 },
  ];

  useEffect(() => {
    fetchTransfers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableRows = Array.isArray(transfers) ? transfers : [transfers];

  const exportToPDF = () => {
    const pdfDoc = generatePDF(tableRows, columns);
    pdfDoc.save("transfer_table.pdf");
  };

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
        toolbar: () => <CustomToolbar exportToPDF={exportToPDF} />,
      }}
    />
  );
}

export default TransferTable;
