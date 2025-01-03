import React, { useState } from "react";
import { Input, Button, Image, Divider } from "antd";
import TextArea from 'antd/es/input/TextArea';
import axios from "axios";
import Items from "./Items";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComboPlanesTable from "./ComboPlanesTable";

const ComboPlanes = () => {
  const [items, setItems] = useState([{ id: 1, name: "", price: "" }]);
  const [image, setImage] = useState("");
  const [comboOfferName, setComboOfferName] = useState("");
  const [comboOfferPrice, setComboOfferPrice] = useState("");
  const [comboOfferDescription, setComboOfferDescription] = useState("");

  const itemName = items.map((field) => field.name);
  const itemPrice = items.map((field) => Number(field.price));

  async function handleNewComboSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comboPlan",
        {
          comboPlanName: comboOfferName,
          description: comboOfferDescription,
          price: comboOfferPrice,
          image: image,
          items: {
            itemName: itemName,
            basePrice: itemPrice,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setItems([{ id: 1, name: "", price: "" }]);
        setComboOfferName("");
        setComboOfferPrice("");
        setComboOfferDescription("");
        setImage("");
        toast.success("Category created successfully");
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

  //Image handling
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  

  return (
    <section className="w-full sm:px-11 max-sm:px-8 max-container">
      <div className="flex flex-col w-full md:flex-row md:gap-2">
        <div className="md:w-1/2 w-full">
          <form className="flex flex-col" onSubmit={handleNewComboSubmit}>
            <label className="mb-2">Combo offer name</label>
            <Input
              placeholder="Family Package"
              required={true}
              type="text"
              className="w-full border-gray-600 h-10 mb-3"
              onChange={(e) => setComboOfferName(e.target.value)}
            />
            <label className="mb-2">Combo description</label>
            <TextArea
              rows={5}
              className="w-full border-gray-600 mb-3 rounded-md items-start"
              required={true}
              onChange={(e) => setComboOfferDescription(e.target.value)}
            />
            <Items items={items} setItems={setItems} />
            <label className="mb-2 mt-2">Final Price</label>
            <Input
              placeholder="LKR"
              required={true}
              type="number"
              className="w-full border-gray-600 h-10 mb-3"
              onChange={(e) => setComboOfferPrice(e.target.value)}
            />
            <label className="text-lg">Upload your image</label>
            <div className="form-outline mb-4">
              <Input
                onChange={handleImage}
                type="file"
                id="formupload"
                name="image"
                className="border-gray-500"
                required
              />
            </div>
            {image ? (
              <Image
                width={250}
                className="rounded-md"
                src={image}
              />
            ) : null}
            <Button
              htmlType="submit"
              className="w-[165px] h-10 bg-orange-500 text-lg font-lg mt-5"
            >
              Save combo offer
            </Button>
          </form>
          <h2 className="m-3">Combo Offer List</h2>

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </div>
      </div>
      <Divider />
      <ComboPlanesTable />
    </section>
  );
};

export default ComboPlanes;
