import React, { useState } from "react";
import { Input, Button } from "antd";
import { handleLandingPage } from "../utils/LandingPage";
import TextArea from 'antd/es/input/TextArea';

const HeroSection = () => {
  const [heroImage, setHeroImage] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setHeroImage(reader.result);
    };
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleLandingPage(heroImage, heroTitle, heroSubtitle);
  };

  return (
    <section className="w-full">
      <div className="w-full flex flex-col md:flex-row md:gap-2">
        <div className="md:w-1/2 w-full">
          <form onSubmit={handleSave}>
            <label className="text-lg">Upload Your Logo</label>
            <Input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="image"
              className="border-gray-500 mb-3"
              required
            />
            <label className="text-lg">Enter Title</label>
            <Input
              type="text"
              className="border-gray-500 mb-3"
              required
              placeholder="Hilton"
              onChange={(e) => setHeroTitle(e.target.value)}
            />
            <label className="text-lg">Enter Subtext</label>
            <TextArea
              type="text"
              className="border-gray-500 mb-3"
              rows={2}
              required
              placeholder="small description is here"
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
            <Button
              className="bg-orange-500 text-lg w-55 h-10 mt-5"
              htmlType="submit"
            >
              Save Hero Section
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
