import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

import Typography from "@mui/material/Typography"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import useStockCall from "../hooks/useStockCall"
import { btnStyle, flex } from "../styles/globalStyle"

function BrandCard({ brand, setOpen, setInfo }) {
  const { deleteStockData } = useStockCall()

  return (
    <Card
      sx={{
        p: 2,
        width: "200px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {brand?.name}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "150px" }}
        image={brand?.image}
        title="firm-image"
        component="img"
      />
      <CardActions sx={flex}>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            setOpen(true)
            setInfo(brand)
          }}
        />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStockData("brands", brand.id)}
        />
      </CardActions>
    </Card>
  )
}
export default BrandCard;