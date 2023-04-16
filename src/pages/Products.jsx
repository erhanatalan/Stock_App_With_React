import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import { flex } from "../styles/globalStyle";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/modals/ProductModal";

const Products = () => {
  const { getStockData } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getStockData("products");
  }, []); // eslint-disable-line
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  // console.log(firms);
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

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          sx={{
            boxShadow: 4,
          }}
        />
      </Box>


    </div>
  );
};

export default Products;
