import React, { useState } from "react";
import { Button } from "antd";
import TextArea from 'antd/es/input/TextArea';
import { handleAboutPage } from "../utils/AboutPage";

const AboutSection = () => {
  const [paragraph, setParagraph] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    handleAboutPage(paragraph, address);
  };
  
  return (
    <section className="w-full">
      <div className="w-full flex flex-col md:flex-row md:gap-2">
        <div className="md:w-1/2 w-full">
          <form onSubmit={handleSave}>
            <label className="text-lg">Enter about paragraph</label>
            <TextArea
              type="text"
              className="border-gray-500 mb-3"
              rows={3}
              required
              placeholder="About here"
              onChange={(e) => setParagraph(e.target.value)}
            />
            <label className="text-lg">Enter Subtitle</label>
            <TextArea
              type="text"
              className="border-gray-500 mb-3"
              required
              placeholder="Address here"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              className="bg-orange-500 text-lg w-55 h-10 mt-5 mb-10"
              htmlType="submit"
            >
              Save About Section
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
