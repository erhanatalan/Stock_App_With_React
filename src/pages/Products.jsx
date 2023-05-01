import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import { DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import ProductModal from "../components/modals/ProductModal";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { btnStyle } from "../styles/globalStyle";


const Products = () => {
  const { deleteStockData, getStockData } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  console.log(products);
  const [open, setOpen] = useState(false);
  
  const [info, setInfo] = useState({
    category_id: "",
    brand_id: "",
    name: "",
  });

  const columns = [
    { field: "id", headerName: "#",headerAlign:"center",
    align:"center", minWidth: 20 ,maxWidth: 50 , flex:1},
    {
      field: "category",
      headerName: "Category",
      headerAlign:"center",
      align:"center",
      width: 100,
      flex:1,
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign:"center",
      align:"center",
      width: 100,
      flex:1,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign:"center",
      align:"center",
      type: "number",
      width: 110,
      flex:1,
    },
    {
      field: "stock",
      headerName: "Stock",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerAlign:"center",
      align:"center",
      flex:1,
      width: 50,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      headerAlign: "center",
      align: "center",
      minWidth: 50,
      flex: 1,
      renderCell: ({ id }) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products", id)}
        />
      ),
    },
  ];
  useEffect(() => {
    getStockData("products");
    getStockData("categories");
    getStockData("brands");
  }, []); // eslint-disable-line
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setInfo();
        }}
      >
        New Product
      </Button>
      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ height: 400, maxWidth: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </div>
  );
};

export default Products;
