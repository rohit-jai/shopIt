import axios from "axios"
import { LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS } from "../constants/userConstants"

    //login

    export const login = (email,password) => async(dispatch) =>{
        try{
            dispatch({ type: LOGIN_REQUEST})
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            const { data } = await axios.post('/user/loginUser',{ email, password}, config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload: data.user
            })
        }
        catch(error)
        {
            dispatch({
                type:LOGIN_FAIL,
                paylod: error.response.data.message
            })
        }
    }

//Register user Constant 

export const register = (userData) => async(dispatch) =>{
    try{
        dispatch({ type: REGISTER_USER_REQUEST})
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/user/register',userData, config)
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload: data.user
        })
    }
    catch(error)
    {
        dispatch({
            type:REGISTER_USER_FAIL,
            paylod: error.response.data.message
        })
    }
}



// load user 


export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({ type: LOAD_USER_REQUEST})
      
        const { data } = await axios.get('/user/me')
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload: data.user
        })
    }
    catch(error)
    {
        dispatch({
            type:LOAD_USER_FAIL,
            paylod: error.response.data.message
        })
    }
}
    //clear errors 

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

