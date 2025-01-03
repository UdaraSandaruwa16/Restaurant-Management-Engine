import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function fetchKitchenItems() {
  try {
    const response = await axios.get("http://localhost:3000/api/menuitem");
    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      throw new Error("Something went wrong");
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
}

export const handleOrderStatus = async (selectedItemId) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/kitchen/item/${selectedItemId}`,
    );
    if (response.status === 200) {
      toast.success("Order status successfully updated");
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
