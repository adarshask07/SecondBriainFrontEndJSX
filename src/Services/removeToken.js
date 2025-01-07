// import { useDispatch } from "react-redux";

// const dispatch = useDispatch()
import store from '../reducer/index'

export const removeToken = () => {
    localStorage.removeItem('token');
    // dispatch(setToken(null));
    store.dispatch({type: 'auth/setToken', payload: null})

}