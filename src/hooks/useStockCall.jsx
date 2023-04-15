import { useDispatch } from "react-redux"
import {
  fetchFail,
  getSuccess,
  fetchStart
} from "../features/stockSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import useAxios from "./useAxios"


const useStockCall = () => {
    const dispatch = useDispatch()
    const { axiosWithToken } = useAxios()
  
    const getStockData = async (url) => {
      dispatch(fetchStart())
      try {
        const { data } = await axiosWithToken(`stock/${url}/`)
        dispatch(getSuccess({ data, url }))
        toastSuccessNotify("Success")
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
        toastErrorNotify("Failed")
      }
    }
    const deleteStockData = async (url,id) => {
      dispatch(fetchStart())
      try {
        await axiosWithToken.delete(`stock/${url}/${id}/`)
        getStockData(url)
        toastSuccessNotify("Firm Delete Success")
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
        toastErrorNotify("Firm Delete Failed")
      }
    }
  
    return {
      getStockData,deleteStockData,
    }
  }
  
  export default useStockCall
  