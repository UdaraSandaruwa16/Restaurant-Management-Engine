import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "antd";

import DropDown from "./DropDown";
import ExtraIngredients from "./ExtraIngredients";
import MenuList from "./MenuList";
import FoodItemSizes from "./FoodItemSizes";
import ImageUpload from "./ImageUpload";

const MenuItems = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [size, setSize] = useState([{ id: 1, itemSize: "", persentage: "" }]);
  const [category, setCategory] = useState("");
  // const [uploadImage, setUploadImage] = useState([]);
  const [inputFields, setInputFields] = useState([
    { id: 1, name: "", price: "" },
  ]);
  const [image, setImage] = useState("");

  async function handleItemSubmit(e) {
    e.preventDefault();
    try {
      const ingredientNames = inputFields.map((field) => field.name);
      const ingredientPrices = inputFields.map((field) => Number(field.price));

      const foodItemSize = size.map((field) => field.itemSize);
      const foodItemPersentage = size.map((field) => Number(field.persentage));
      // const base64Image = uploadImage.length > 0 ? uploadImage[0].thumbUrl.split(',')[1] : '';

      // console.log(base64Image);

      const response = await fetch("http://localhost:3000/api/menuitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: itemName,
          description: Description,
          basePrice: price,
          image: image,
          sizes: {
            sizeName: foodItemSize,
            percentage: foodItemPersentage,
          },
          category: category,
          extraIngredients: {
            ingredientName: ingredientNames,
            ingredientPrice: ingredientPrices,
          },
        }),
      });
      if (response.ok) {
        toast.success("Category created successfully");
        setInputFields([{ id: 1, name: "", price: "" }]);
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
    <section className="max-container w- full sm:px-11 max-sm:px-8">
      <form onSubmit={handleItemSubmit}>
        <div className="w-full flex flex-col md:flex-row md:gap-2">
          <div className="md:w-1/2 w-full">
            <label className="text-lg">Item Name</label>
            <Input
              placeholder="Pizza"
              required={true}
              type="text"
              className="w-full border-gray-600 h-10 mb-3"
              onChange={(e) => setItemName(e.target.value)}
            />
            <label className="text-lg">Base price</label>
            <Input
              placeholder="LKR"
              required={true}
              type="number"
              className="w-full border-gray-600 h-10 mb-3"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className="text-lg">Description</label>
            <TextArea
              placeholder="Description"
              required={true}
              type="text"
              rows={4}
              className="w-full border-gray-600 h-10 mb-3"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-lg">Select Category</label>
            <DropDown className={"mb-3"} setCategory={setCategory} />
            <FoodItemSizes size={size} setSize={setSize} />
            <ExtraIngredients
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
            <div className="flex flex-row">
              <ImageUpload image={image} handleImage={handleImage} />
            </div>
          </div>
          <div className="md:pl-4 md:mb-[500px] relative md:w-1/2 md:flex md:justify-end items-center md:items-start mt-5 md:flex-col mb-3"></div>
        </div>
        <Button
          htmlType="submit"
          className="w-[155px] h-10 bg-orange-500 text-lg font-lg mt-5"
        >
          Save item
        </Button>
      </form>
      <Divider />

      <h2 className="m-3">Menu List</h2>
      <ToastContainer />
      <MenuList />
    </section>
  );
};

export default MenuItems;
