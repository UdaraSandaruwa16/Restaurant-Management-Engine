import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function handleAboutPage(paragraph, address) {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/aboutpage",
      {
        paragraph: paragraph,
        address: address,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) { 
      toast.success("Page updated successfully"); 
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
