import toast from "react-hot-toast";
import { setLoading, setMemories } from "../Slices/brainSlice";
import { apiConnector } from "./apiConnector";
import { useNavigate } from "react-router-dom";

import { removeToken } from "./removeToken";

// Utility to handle token expiry
const handleTokenExpiry = (navigate) => {
    toast.error("Please login again");
    removeToken(); // Remove token from cookies/localStorage/Redux
    // navigate("/"); // Redirect to login page
};

// Create Memory
export function createMemory(token, memory) {
    return async (dispatch) => {
        const navigate = useNavigate();
        toast.remove();
        const toastId = toast.loading("Creating Memory...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", "/memories/create", memory, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setMemories(response.data.data));
            toast.success("Memory Created", {
                id: toastId,
            });
        } catch (error) {
            if (error.message === "token is invalid") {
                handleTokenExpiry(); // Handle token expiry
            } else {
                toast.error(error.message, { id: toastId });
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// Get Memories
export function getMemories(token, navigate) {
    return async (dispatch) => {
        toast.remove();
        const toastId = toast.loading("Fetching Memories...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "GET",
                "/memories/get-all",
                {},
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setMemories(response.data.data));
            toast.success("Memories Fetched", {
                id: toastId,
            });
        } catch (error) {
            if (error.message === "token is invalid") {
                toast.remove();
                handleTokenExpiry(navigate); // Handle token expiry
                
            } else {
                toast.error(error.message, {
                    id: toastId,
                });
                navigate("/"); // Redirect to home or fallback page
            }
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// Get Single Memory
export const getMemory = async (token, id) => {
    const toastId = toast.loading("Fetching Memory...", { id: "memory" });
    try {
        const response = await apiConnector("GET", `/memories/get-memory/${id}`, {}, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Memory Fetched", {
            id: toastId,
        });

        return response.data.data;
    } catch (error) {
        if (error.message === "token is invalid") {
            handleTokenExpiry(); // Handle token expiry

        } else {
            toast.error(error.message, { id: toastId });
        }
    } finally {
        toast.dismiss(toastId);
    }
};

// Update Memory
export const updateMemories = async (token, memory) => {
    const toastId = toast.loading("Updating Memory...", { id: "memory" });
    try {
        const response = await apiConnector(
            "POST",
            `/memories/update/${memory._id}`,
            memory,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }

        toast.success("Memory Updated", {
            id: toastId,
        });

        return response?.data?.data;
    } catch (error) {
        if (error.message === "token is invalid") {
            handleTokenExpiry(); // Handle token expiry
        } else {
            toast.error(error.message, { id: toastId });
        }
    } finally {
        toast.dismiss(toastId);
    }
};

// Delete Memory
export const deleteMemory = async (token, id) => {
    const toastId = toast.loading("Deleting Memory...");
    try {
        const response = await apiConnector("POST", `/memories/delete/${id}`, {}, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Memory Deleted", {
            id: toastId,
        });

        return response?.data;
    } catch (error) {
        if (error.message === "token is invalid") {
            handleTokenExpiry(); // Handle token expiry
        } else {
            toast.error(error.message, { id: toastId });
        }
    } finally {
        toast.dismiss(toastId);
    }
};
