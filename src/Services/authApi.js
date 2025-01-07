
import { apiConnector } from "./apiConnector";
import { setError, setLoading, setToken } from "../Slices/authSlice";
import toast from "react-hot-toast";


export function login (email, password,navigate) {
    toast.remove() ; 
    console.log("Loggin called")
    return async (dispatch) =>{
        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));
        try {
            // console.log("request posting")
            const response = await apiConnector(
                "POST",
                "/auth/login",
                {email,password},

            )
        
            if(!response.data.success){
               
                throw new Error(response.data.message);
            }
        
            dispatch(setToken(response.data.token));
            
            localStorage.setItem("token",response.data.token);
            
            toast.success("Login Successful",{
                id: toastId,
            });
           
            navigate("/memories");

        } catch (error) {
            toast.error(error.message,{
                id: toastId,
            });
            dispatch(setError(error.message));
            console.log('first')
            navigate("/");
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId); 
       


    }

}


export function signup (email,username, password,navigate) {
    console.log("Signup Called")
    return async(dispatch)=>{
        const toastId = toast.loading("Signing up...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "POST",
                "/auth/register",
                {username,email,password},
            );
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            dispatch(setError(error.message));
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export const logout = (navigate) => { 
    return async(dispatch)=>{   
        const toastId = toast.loading("Logging out...");
        dispatch(setLoading(true));
        dispatch(setToken(null));
        localStorage.removeItem("token");
        toast.success("Logout Successful");
        navigate("/");
        toast.dismiss(toastId);
    }
}