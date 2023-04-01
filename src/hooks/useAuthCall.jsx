import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    registerSuccess} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"

const useAuthCall = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const BASE_URL="https://12226.fullstack.clarusway.com/"
    const login = async (userInfo)=>{
        dispatch(fetchStart())
        try{
            const {data} = await axios.post(`${BASE_URL}account/auth/login/`, userInfo)
            dispatch(loginSuccess(data))
            toastSuccessNotify("Login Succsess")
            navigate("/stock")
            console.log(data)
            return data
        }catch (error){
            dispatch(fetchFail())
            toastErrorNotify("Login Failed")
            console.log(error)
        }
    }
    const logout = async () => {
        dispatch(fetchStart())
        try {
          await axios.post(`${BASE_URL}account/auth/logout/`)
          dispatch(logoutSuccess())
          toastSuccessNotify("Logout performed")
          navigate("/")
        } catch (err) {
          dispatch(fetchFail())
          toastErrorNotify("Logout can not be performed")
        }
      }
    
      const register = async (userInfo) => {
        dispatch(fetchStart())
        try {
          const { data } = await axios.post(
            `${BASE_URL}account/register/`,
            userInfo
          )
          dispatch(registerSuccess(data))
          toastSuccessNotify("Register performed")
          navigate("/stock")
        } catch (err) {
          dispatch(fetchFail())
          toastErrorNotify("Register can not be performed")
        }
      }
    
      return { login, register, logout }
}

export default useAuthCall