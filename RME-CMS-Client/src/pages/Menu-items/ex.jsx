import { Button, Input } from "antd";

const ExtraIngredients = ({ inputIngredient, setInputIngredient }) => {
  const handleAddFields = () => {
    const newinputIngredient = [...inputIngredient];
    newinputIngredient.push({ id: inputIngredient.length + 1, name: "", price: "" });
    setInputIngredient(newinputIngredient);
  };

  const handleRemoveFields = (id) => {
    const newinputIngredient = inputIngredient.filter((field) => field.id !== id);
    setInputIngredient(newinputIngredient);
  };

  const handleChangeInput = (id, event) => {
    const newinputIngredient = inputIngredient.map((field) => {
      if (id === field.id) {
        return { ...field, name: event.target.value };
      }
      return field;
    });
    setInputIngredient(newinputIngredient);
  };

  const handleChangePrice = (id, event) => {
    const newinputIngredient = inputIngredient.map((field) => {
      if (id === field.id) {
        return { ...field, price: event.target.value };
      }
      return field;
    });
    setInputIngredient(newinputIngredient);
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full">
        <label className="text-lg">Extra ingredients</label>
        <label className="text-lg md:ml-[160px] max-md:ml-10">Price</label>
      </div>
      {inputIngredient.map((inputField) => (
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
