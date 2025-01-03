import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, Image } from "antd";

const ImageUpload = ({ image, handleImage }) => {
  //handle and convert it in base 64
  return (
    <div className="mt-3">
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
    </div>
  );
};

export default ImageUpload;
