import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function fetchCombo() {
  try {
    const response = await axios.get("http://localhost:3000/api/comboPlan");
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

export const handleComboDelete = async (record) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/comboPlan/${record._id}`
    );
    if (response.status === 200) {
      toast.success("Item deleted successfully");
    } else {
      throw new Error("Failed to delete item");
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

export const handleComboUpdate = async (
  editFormData,
  image,
  setEditModalVisible,
  selectedItem,
) => {
  try {
    const formData = new FormData();
    const response = await axios.put(
      `http://localhost:3000/api/comboPlan/${selectedItem._id}`,
      editFormData,
      formData.append("image", image)
    );
    if (response.status === 200) {
      toast.success("Item updated successfully");
      setEditModalVisible(false);
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
