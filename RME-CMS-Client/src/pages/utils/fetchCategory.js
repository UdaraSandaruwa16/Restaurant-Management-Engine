import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function fetchDataFromCategory() {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    const data = response.data;
    return data; 
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
    throw error; 
  }
}

