import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector"



export const getSearch = async (token, query)=>{
    const toastId = toast.loading("Searching")

    try {
        const response = await apiConnector("POST","/memories/search",{query}, {
            Authorization: `Bearer ${token}`,
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

       

        return response.data;
    } catch (error) {
        if (error.message === "token is invalid") {
            handleTokenExpiry(); // Handle token expiry
           
        } else {
            toast.error(error.message, { id: toastId });
        }
        return null ;

    } finally {
        toast.dismiss(toastId);
    }
}   