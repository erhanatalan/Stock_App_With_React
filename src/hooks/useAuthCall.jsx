import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";

const useAuthCall = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const BASE_URL="https://12226.fullstack.clarusway.com/"
    const login = async (userInfo)=>{
        dispatch(fetchStart())
        try{
            const {data} = await axios.post(`${BASE_URL}account/auth/login/`, userInfo)
            dispatch(loginSuccess(data))
            navigate("/stock")
            console.log(data)
            return data
        }catch (error){
            dispatch(fetchFail())
            console.log(error)
        }
    }
    const register = async (userInfo)=>{
        dispatch(fetchStart())
        try{
            const {data} = await axios.post(`${BASE_URL}account/register/`, userInfo)
            dispatch(loginSuccess(data))
            navigate("/stock")
            console.log(data)
            return data
        }catch (error){
            dispatch(fetchFail())
            console.log(error)
        }
    }
    return {login, register}
}

export default useAuthCall