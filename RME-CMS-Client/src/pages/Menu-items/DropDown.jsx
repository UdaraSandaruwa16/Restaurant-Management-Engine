import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Select, Space } from "antd";
import "react-toastify/dist/ReactToastify.css";

const DropDown = ({ className, setCategory }) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          value: item._id,
          label: item.categoryName,
        }));
        setData(formattedData);
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
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (value, option) => {
    const categoryName = option.label;
    setCategory(categoryName);
  };

  return (
    <div className={className}>
      <Space wrap>
        <Select
          style={{
            width: 150,
          }}
          defaultValue='Select category'
          onChange={handleCategoryChange} // Update the onChange handler
          options={data}
        />
      </Space>
    </div>
    
  );
};

export default DropDown;
