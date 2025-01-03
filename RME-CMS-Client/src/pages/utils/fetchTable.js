import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function handleNewTableSubmit(tableNumber, capacity) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/table",
      {
        number: tableNumber,
        capacity: capacity,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 201) {
      toast.success("Table created successfully");
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
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

export async function fetchTableData() {
  try {
    const response = await axios.get("http://localhost:3000/api/table");
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

export const handleTableDelete = async (record) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/table/${record._id}`
    );
    if (response.status === 200) {
      toast.success("Table deleted successfully");
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

export const handleTableUpdate = async (editFormData, selectedItem) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/table/${selectedItem._id}`,
      editFormData,
    );
    if (response.status === 200) {
      toast.success("Table updated successfully");
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


