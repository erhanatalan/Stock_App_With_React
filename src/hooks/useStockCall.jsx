import { useDispatch } from "react-redux"
import {
  fetchFail,
  getSuccess,
  fetchStart,
  getProCatBrandSuccess,
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
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
      }
    }
  
    return {
      getStockData,
    }
  }
  
  export default useStockCall
  