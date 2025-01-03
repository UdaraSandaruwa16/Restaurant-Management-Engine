import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select, Space } from "antd";
import "react-toastify/dist/ReactToastify.css";

const GetOrderDropDown = ({ selectedItem, setSelectedItem }) => {
  const [getItem, setGetItem] = useState([]);

  useEffect(() => {
    async function getItemsForDropDown() {
      try {
        const response = await axios.get("http://localhost:3000/api/kitchen");
        if (response.status === 200) {
          const data = response.data;
          const formattedData = data.map((item, index) => ({
            value: item._id,
            label: item.orderCode,
          }));
          setGetItem(formattedData);
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
    getItemsForDropDown();
  }, [getItem]);

  const handleCategoryChange = (value, option) => {
    const userEmail = option.label;
    setSelectedItem({ value });
  };

  return (
    <div className="mb-5 w-25">
      <Space wrap>
        <Select
          style={{
            width: 150,
          }}
          defaultValue="Select order"
          onChange={handleCategoryChange} // Update the onChange handler
          options={getItem}
        />
      </Space>
    </div>
  );
};

export default GetOrderDropDown;
