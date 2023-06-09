import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useStockCall from '../hooks/useStockCall';
import FirmCard from '../components/FirmCard';
import { flex } from '../styles/globalStyle';
import FirmModal from '../components/modals/FirmModal';

const Firms = () => {
  const { getStockData } = useStockCall()
  const { firms } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getStockData("firms")
  }, []) // eslint-disable-line
  const [info, setInfo] = useState({
    name: "",
    phone:"",
    address:"",
    image:"",
})
  // console.log(firms);
  return (
    <div>
      <Typography variant='h4' color='error' mb={3}>
        Firm
      </Typography>
      <Button variant='contained' onClick={()=>{
        setOpen(true)
        setInfo()
        }}>New Firm</Button>
      <FirmModal info={info} setInfo={setInfo} open={open} setOpen={setOpen}/>
      <Grid container sx={flex}>
      {firms?.map((firm)=>(
        <Grid item key={firm?.id}>
          <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo}/>
        </Grid>

      ))}
      </Grid>
      
    </div>
  )
}

export default Firms;