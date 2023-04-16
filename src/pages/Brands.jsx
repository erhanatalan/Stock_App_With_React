import React, { useEffect, useState } from 'react'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import { Button, Grid, Typography } from '@mui/material'
import { flex } from '../styles/globalStyle'
import BrandCard from '../components/BrandCard'
import BrandModal from '../components/modals/BrandModal'

const Brands = () => {

  const { getStockData } = useStockCall()
  const { brands } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getStockData("brands")
  }, []) // eslint-disable-line
  const [info, setInfo] = useState({
    name: "",
    image:"",
})
  return (
    <div>
      <Typography variant='h4' color='error' mb={3}>
        Brands
      </Typography>
      <Button variant='contained' onClick={()=>{
        setOpen(true)
        setInfo()
        }}>New Brand</Button>
      <BrandModal info={info} setInfo={setInfo} open={open} setOpen={setOpen}/>
      <Grid container sx={flex}>
      {brands?.map((brand)=>(
        <Grid item key={brand?.id}>
          <BrandCard brand={brand} setInfo={setInfo} open={open} setOpen={setOpen}/>
        </Grid>

      ))}
      </Grid>
      
    </div>
  )
}

export default Brands;