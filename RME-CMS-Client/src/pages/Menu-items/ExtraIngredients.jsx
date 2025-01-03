import { Button, Input } from "antd";

const ExtraIngredients = ({ inputFields, setInputFields }) => {
  
  const handleAddFields = () => {
    const newInputFields = [...inputFields];
    newInputFields.push({ id: inputFields.length + 1, name: "", price: "" });
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (id) => {
    const newInputFields = inputFields.filter((field) => field.id !== id);
    setInputFields(newInputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((field) => {
      if (id === field.id) {
        return { ...field, name: event.target.value };
      }
      return field;
    });
    setInputFields(newInputFields);
  };

  const handleChangePrice = (id, event) => {
    const newInputFields = inputFields.map((field) => {
      if (id === field.id) {
        return { ...field, price: event.target.value };
      }
      return field;
    });
    setInputFields(newInputFields);
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full">
        <label className="text-lg">Extra ingredients</label>
        <label className="text-lg md:ml-[160px] max-md:ml-10">Price</label>
      </div>
      {inputFields.map((inputField) => (
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
        Add another ingredient
      </Button>
    </div>
  );
};

export default ExtraIngredients;
