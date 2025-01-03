import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function handleLandingPage(heroImage, heroTitle, heroSubtitle) {
    console.log(heroImage, heroTitle, heroSubtitle);
   try {
     const response = await axios.put(
       "http://localhost:3000/api/landingpage",
       {
         headerText: heroTitle,
         paragraph: heroSubtitle,
         image: heroImage,
       },
       {
         headers: { "Content-Type": "application/json" },
       }
     );
 
     if (response.status === 201) {
       toast.success("Page updated successfully");
       console.log("Design saved");
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