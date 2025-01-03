import React from "react";
import { Button, Input } from "antd";

const FoodItemSizes = ({ size, setSize }) => {
  const handleAddFields = () => {
    const newsize = [...size];
    newsize.push({ id: size.length + 1, itemSize: "", persentage: "" });
    setSize(newsize);
  };

  const handleRemoveFields = (id) => {
    const newsize = size.filter((field) => field.id !== id);
    setSize(newsize);
  };

  const handleChangeInput = (id, event) => {
    const newsize = size.map((field) => {
      if (id === field.id) {
        return { ...field, itemSize: event.target.value };
      }
      return field;
    });
    setSize(newsize);
  };

  const handleChangePrice = (id, event) => {
    const newsize = size.map((field) => {
      if (id === field.id) {
        return { ...field, persentage: event.target.value };
      }
      return field;
    });
    setSize(newsize);
  };

  return (
    <div className="mb-3">
      <div className="flex flex-row items-center w-full">
        <label className="text-lg">Food Item Size</label>
        <label className={"text-lg md:ml-[180px] max-md:ml-10"}>
          Persentage
        </label>
      </div>
      {size.map((item) => (
        <div key={item.id} className="mb-3 flex flex-row gap-3">
          <Input
            placeholder="Enter ingredient name"
            required
            className="border-gray-600 h-10"
            value={item.itemSize}
            onChange={(event) => handleChangeInput(item.id, event)}
          />
          <Input
            placeholder="Enter ingredient price"
            required
            type="number"
            className="border-gray-600 h-10"
            value={item.persentage}
            onChange={(event) => handleChangePrice(item.id, event)}
          />
          <Button
            type="link"
            danger={true}
            onClick={() => handleRemoveFields(item.id)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="primary" onClick={handleAddFields}>
        Add another size
      </Button>
    </div>
  );
};

export default FoodItemSizes;
