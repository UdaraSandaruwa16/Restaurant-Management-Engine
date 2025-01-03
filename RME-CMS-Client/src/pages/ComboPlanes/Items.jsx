import React from 'react'
import { Button, Input } from "antd";

const Items = ({ items, setItems }) => {
    const handleAddFields = () => {
        const newitems = [...items];
        newitems.push({ id: items.length + 1, name: "", price: "" });
        setItems(newitems);
      };
    
      const handleRemoveFields = (id) => {
        const newitems = items.filter((field) => field.id !== id);
        setItems(newitems);
      };
    
      const handleChangeInput = (id, event) => {
        const newitems = items.map((field) => {
          if (id === field.id) {
            return { ...field, name: event.target.value };
          }
          return field;
        });
        setItems(newitems);
      };
    
      const handleChangePrice = (id, event) => {
        const newitems = items.map((field) => {
          if (id === field.id) {
            return { ...field, price: event.target.value };
          }
          return field;
        });
        setItems(newitems);
      };
  return (
    <div>
      <div className="flex flex-row items-center w-full">
        <label className="text-lg">Item Name</label>
        <label className="text-lg md:ml-[210px] max-md:ml-[90px]">Price</label>
      </div>
      {items.map((inputField) => (
        <div key={inputField.id} className="mb-3 flex flex-row gap-3">
          <Input
            placeholder="Enter ingredient name"
            required
            className="border-gray-600 h-10"
            value={inputField.name}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <Input
            placeholder="Enter ingredient price"
            required
            type="number"
            className="border-gray-600 h-10"
            value={inputField.price}
            onChange={(event) => handleChangePrice(inputField.id, event)}
          />
          <Button
            type="link"
            danger={true}
            onClick={() => handleRemoveFields(inputField.id)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="primary" onClick={handleAddFields}>
        Add another Item
      </Button>
    </div>
  )
}

export default Items