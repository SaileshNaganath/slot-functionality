import { AxiosInstance } from "../utils/AxiosInstance";
import { returnErrors } from "./errorActions";
import { 
    GET_SLOTS, 
    SLOTS_LOADING, 
    ADD_SLOT_DATE,
    ADD_TIME_SLOT,
    DELETE_SLOT,
    DELETE_TIME_SLOT,
    GET_SLOT_BY_DATE,
    GET_SUMMARY,
    UPDATE_SLOT,
    SLOTS_REQUEST
} from "./types";



//get all slots
export const getSlots = () => dispatch =>{

    dispatch({type:SLOTS_LOADING});

    const URL = '/api/slots';

    AxiosInstance.get(URL)
    .then(res=>dispatch({
        type:GET_SLOTS,
        payload:res.data
    }))
    .catch (error=>{
        dispatch(returnErrors(error.response.data, error.response.status));
    })
}
//add slot date
export const createSlotDate = (slot) => (dispatch) => {

    const URL = "/api/slots";

    AxiosInstance.post(URL, slot)
        .then(res => dispatch({
            type: ADD_SLOT_DATE,
            payload: res.data
        }))
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}
//add slot time
export const createTimeSlot = (slot,id) => (dispatch) => {

    const URL = `/api/slots/${id}`;

    AxiosInstance.post(URL, slot)
        .then(res => dispatch({
            type: ADD_TIME_SLOT,
            payload: res.data
        }))
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}

//delete service
export const deleteSlot = (id) => (dispatch) => {

    const URL = `/api/slots/${id}`;

    AxiosInstance.delete(URL)
        .then(() => dispatch({
            type: DELETE_SLOT,
            payload: id
        }))
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}
//delete service
export const deleteTimeSlot = (id) => (dispatch) => {

    const URL = `/api/timeSlot/${id}`;

    AxiosInstance.delete(URL)
        .then(() => dispatch({
            type: DELETE_TIME_SLOT,
            payload: id
        }))
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}

//get slot by date
export const getSlotByDate = (id) => dispatch =>{

    dispatch({type:SLOTS_REQUEST});

    const URL = `/api/slot/${id}`;

    AxiosInstance.get(URL)
    .then(res=>dispatch({
        type:GET_SLOT_BY_DATE,
        payload:res.data
    }))
    .catch (error=>{
        dispatch(returnErrors(error.response.data, error.response.status));
    })
}

export const updateSlot = (data,id) => (dispatch) =>{

    dispatch({type:SLOTS_REQUEST});

    const URL = `/api/slot/${id}`;

    AxiosInstance.put(URL,data)
    .then(res=>dispatch({
        type:UPDATE_SLOT,
        payload:res.data
    }))
    .catch (error=>{
        dispatch(returnErrors(error.response.message,error.response.status));
    })
}

export const getSummary = (id) => dispatch =>{

    dispatch({type:SLOTS_REQUEST});

    const URL = `/api/summary/${id}`;

    AxiosInstance.get(URL)
    .then(res=>dispatch({
        type:GET_SUMMARY,
        payload:res.data
    }))
    .catch (error=>{
        dispatch(returnErrors(error.response.data, error.response.status));
    })
}