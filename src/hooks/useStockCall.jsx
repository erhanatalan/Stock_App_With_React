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
        // toastSuccessNotify("Success")
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
        toastSuccessNotify("Delete Success")
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
        toastErrorNotify("Delete Failed")
      }
    }
    const postStockData = async (url, info) => {
      dispatch(fetchStart())
      try {
        await axiosWithToken.post(`stock/${url}/`, info)
        getStockData(url)
        toastSuccessNotify("Add Success")
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
        toastErrorNotify("Add Failed")
      }
    }
    const putStockData = async (url, info) => {
      dispatch(fetchStart())
      try {
        await axiosWithToken.put(`stock/${url}/${info.id}/`, info)
        getStockData(url)
        toastSuccessNotify("Changed Success")
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
        toastErrorNotify("Changed Failed")
      }
    }
  
    return {
      getStockData,deleteStockData,postStockData,putStockData,
    }
  }
  
  export default useStockCall
  