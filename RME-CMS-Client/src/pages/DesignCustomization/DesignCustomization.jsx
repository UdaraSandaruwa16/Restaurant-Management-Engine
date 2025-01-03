import React, { useState } from "react";
import { Input, Button, Divider, Image } from "antd";
import { ChromePicker } from "react-color";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleNewDesignSubmit } from "../utils/design";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";

const DesignCustomization = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewDesignSubmit(image, name, primaryColor, secondaryColor);
  };

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

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color.hex);
  };

  const handleSecondaryColorChange = (color) => {
    setSecondaryColor(color.hex);
  };

  const handleSaveTheme = () => {
    console.log("Primary Color:", primaryColor);
    console.log("Secondary Color:", secondaryColor);
  };

  return (
    <section className="max-container w-full sm:px-11 max-sm:px-8">
      <div className="w-full flex flex-col md:flex-row md:gap-2">
        <div className="md:w-1/2 w-full">
          <h2 className="mb-3">Main Custermizations</h2>
          <form onSubmit={handleSubmit}>
            <label className="text-lg">Upload Your Logo</label>
            <Input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="image"
              className="border-gray-500 mb-1"
              required
            />
            <Image src={image} width={150} />
            <label className="text-lg">Enter your restaurant name</label>
            <Input
              type="text"
              className="border-gray-500 mb-3"
              required
              placeholder="Hilton"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="mt-3">
              <label className="text-xl">Pick your primary color</label>
              <ChromePicker
                color={primaryColor}
                onChange={handlePrimaryColorChange}
              />
            </div>
            <div className="mt-5">
              <label className="text-xl">Pick your secondary color</label>
              <ChromePicker
                color={secondaryColor}
                onChange={handleSecondaryColorChange}
              />
            </div>
            <Button
              className="bg-orange-500 text-lg w-50 h-10 mt-5"
              htmlType="submit"
              onClick={handleSaveTheme}
            >
              Save theme
            </Button>
          </form>
        </div>
      </div>

      <Divider />
      <h2 className="mb-3">Hero Section Custermizations</h2>
      <HeroSection />
      <Divider />
      <h2 className="mb-3">About Section Custermizations</h2>
      <AboutSection />
      <ToastContainer />
    </section>
  );
};

export default DesignCustomization;
