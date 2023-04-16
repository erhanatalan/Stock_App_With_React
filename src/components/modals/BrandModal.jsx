import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { modalStyle } from '../../styles/globalStyle';
// import { useState } from 'react';
import useStockCall from '../../hooks/useStockCall';


const BrandModal = ({info, setInfo,setOpen,open}) => {
    const { postStockData, putStockData } = useStockCall()
    

    const handleChange =(e)=>{
        const {name, value}= e.target
        setInfo({...info, [name]: value})

    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        info?.name ? putStockData("brands", info) : postStockData("brands", info)
        setOpen(false)
        setInfo({ name: "", image: "" })
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              required
              value={info?.name}
              onChange={handleChange}
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              value={info?.image}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" >
              Submit Brand
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BrandModal;