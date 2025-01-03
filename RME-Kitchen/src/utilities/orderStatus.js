import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleStatusUpdate = async (selectedItemId) => {
  console.log(selectedItemId);
  try {
    const response = await axios.put(
      `http://localhost:3000/api/kitchen/${selectedItemId}`,
    
    );
    if (response.status === 200) {
      toast.success("Item updated successfully");
    } else {
      throw new Error("Failed to update item");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
