import React, { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import { Button, Grid, Typography } from '@mui/material'
import { flex } from '../styles/globalStyle'
import BrandCard from '../components/BrandCard'

const Brands = () => {

  const { getStockData } = useStockCall()
  const { brands } = useSelector((state) => state.stock)
  console.log(brands);

  useEffect(() => {
    getStockData("brands")
  }, []) // eslint-disable-line
  return (
    <div>
      <Typography variant='h4' color='error' mb={3}>
        Brands
      </Typography>
      <Button variant='contained'>New Brand</Button>
      <Grid container sx={flex}>
      {brands?.map((brand)=>(
        <Grid item key={brand?.id}>
          <BrandCard brand={brand}/>
        </Grid>

      ))}
      </Grid>
      
    </div>
  )
}

export default Brands;