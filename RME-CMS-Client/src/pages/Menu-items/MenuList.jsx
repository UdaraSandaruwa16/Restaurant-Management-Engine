import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Divider, Modal, Form, Input, Button, Image } from "antd";
import { Select } from "antd";
import axios from "axios";
import { fetchDataFromCategory } from "../utils/fetchCategory";

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    itemName: "",
    basePrice: "",
    category: "",
    description: "",
    sizes: [],
    image: "",
    extraIngredients: [],
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/menuitem");
      if (response.status === 200) {
        setMenuItems(response.data);
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

  console.log(menuItems);

  useEffect(() => {
    fetchData();
    fetchDataFromCategory().then((data) => {
      setCategories(data);
    });
  }, [menuItems]);

  const handleCategoryChange = (value, option) => {
    setEditFormData({ ...editFormData, category: value });
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/menuitem/${record._id}`
      );
      if (response.status === 200) {
        toast.success("Item deleted successfully");
        fetchData();
      } else {
        throw new Error("Failed to delete item");
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
  };

  const handleEdit = (record) => {
    setSelectedItem(record);
    setEditFormData({
      itemName: record.itemName,
      basePrice: record.basePrice,
      category: record.category,
      description: record.description,
      sizes: record.sizes,
      extraIngredients: record.extraIngredients,
      image: record.imgURL,
    });
    setImage(record.imgURL);
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      const response = await axios.put(
        `http://localhost:3000/api/menuitem/${selectedItem._id}`,
        editFormData,
        formData.append("image", image)
      );
      if (response.status === 200) {
        toast.success("Item updated successfully");
        setEditModalVisible(false);
        fetchData();
      } else {
        throw new Error("Failed to update item");
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
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Function to handle adding a new set of ingredients
  // const handleAddEditFormIngredientSet = () => {
  //   // Assuming editFormData is properly updated to contain the extraIngredients array
  //   setEditFormData((prevFormData) => ({
  //     ...prevFormData,
  //     extraIngredients: [
  //       ...prevFormData.extraIngredients,
  //       { _id: Date.now(), ingredientName: [""], ingredientPrice: [""] },
  //     ],
  //   }));
  // };

  // // Function to handle removing a set of ingredients
  // const handleRemoveEditFormIngredientSet = (setId) => {
  //   setEditFormData((prevFormData) => ({
  //     ...prevFormData,
  //     extraIngredients: prevFormData.extraIngredients.filter(
  //       (ingredientSet) => ingredientSet._id !== setId
  //     ),
  //   }));
  // };

  // Function to handle changing the name of an ingredient
  const handleEditFormIngredientNameChange = (setIndex, index, value) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      extraIngredients: prevFormData.extraIngredients.map((ingredientSet, i) =>
        i === setIndex
          ? {
              ...ingredientSet,
              ingredientName: ingredientSet.ingredientName.map((name, j) =>
                j === index ? value : name
              ),
            }
          : ingredientSet
      ),
    }));
  };

  // Function to handle changing the price of an ingredient
  const handleEditFormIngredientPriceChange = (setIndex, index, value) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      extraIngredients: prevFormData.extraIngredients.map((ingredientSet, i) =>
        i === setIndex
          ? {
              ...ingredientSet,
              ingredientPrice: ingredientSet.ingredientPrice.map((price, j) =>
                j === index ? value : price
              ),
            }
          : ingredientSet
      ),
    }));
  };
  // end of the hanling

  // Function to handle changing the name of a size
  const handleSizeNameChange = (index, sizeIndex, value) => {
    const updatedSizes = [...editFormData.sizes];
    updatedSizes[index].sizeName[sizeIndex] = value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      sizes: updatedSizes,
    }));
  };

  // Function to handle changing the percentage of a size
  const handleSizePercentageChange = (index, sizeIndex, value) => {
    const updatedSizes = [...editFormData.sizes];
    updatedSizes[index].percentage[sizeIndex] = value;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      sizes: updatedSizes,
    }));
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
      setImage(reader.result); // Set the image state, not editFormData
    };
  };

  return (
    <div className="flex items-center min-w-full ">
      <Table
        dataSource={menuItems}
        bordered
        style={{ width: "100%" }}
      >
        <Column title="Item Name" dataIndex="itemName" key="itemName" />
        <Column title="Base Price" dataIndex="basePrice" key="basePrice" />
        <Column title="Category" dataIndex="category" key="category" />
        <ColumnGroup title="Sizes and persentage">
          <Column
            title="Sizes"
            dataIndex="sizes"
            key="sizes"
            render={(sizes) => (
              <>
                {sizes.map((sizeObj, index) => (
                  <div key={index}>
                    {sizeObj.sizeName.map((size, idx) => (
                      <p key={idx}>{size}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
          <Column
            title="Percentage"
            dataIndex="sizes"
            key="percentage"
            render={(sizes) => (
              <>
                {sizes.map((sizeObj, index) => (
                  <div key={index}>
                    {sizeObj.percentage.map((percentage, idx) => (
                      <p key={idx}>{percentage}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
        </ColumnGroup>
        <ColumnGroup title="Extra ingredients and prices">
          <Column
            title="extra ingredients"
            dataIndex="extraIngredients"
            key="extraIngredients"
            render={(sizes) => (
              <>
                {sizes.map((sizeObj, index) => (
                  <div key={index}>
                    {sizeObj.ingredientName.map((ingredientName, idx) => (
                      <p key={idx}>{ingredientName}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
          <Column
            title="ingredient price"
            dataIndex="extraIngredients"
            key="extraIngredients"
            render={(sizes) => (
              <>
                {sizes.map((sizeObj, index) => (
                  <div key={index}>
                    {sizeObj.ingredientPrice.map((ingredientPrice, idx) => (
                      <p key={idx}>{ingredientPrice}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
        </ColumnGroup>
        <Column
          title="Image"
          key="image"
          className="flex justify-center items-center"
          render={(record) => (
            <Image
              src={record.imgURL}
              className="rounded-md"
              width={180}
              alt={record.itemName}
            />
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a className="text-red-500" onClick={() => handleDelete(record)}>
                Delete
              </a>
              <Divider type="vertical" />
              <a onClick={() => handleEdit(record)}>Edit</a>
            </span>
          )}
        />
      </Table>

      <Modal
        title="Edit Item"
        open={editModalVisible}
        onOk={handleUpdate}
        onCancel={() => setEditModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Item Name">
            <Input
              name="itemName"
              value={editFormData.itemName}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Base Price">
            <Input
              name="basePrice"
              value={editFormData.basePrice}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              style={{ width: "100%" }}
              value={editFormData.category}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
              rows={3}
            />
          </Form.Item>
          <Form.Item label="Extra Ingredient">
            {editFormData.extraIngredients.map((ingredientSet, setIndex) => (
              <div key={ingredientSet._id}>
                {ingredientSet.ingredientName.map((ingredientName, index) => (
                  <div key={`${ingredientSet._id}-${index}`}>
                    <div className="flex flex-row items-center w-full">
                      <label className="text-sm text-gray-500">Ingredient Name</label>
                      <label className="text-sm text-gray-500 md:ml-[145px] max-md:ml-10">
                        Price
                      </label>
                    </div>
                    <div className="mb-3 flex flex-row gap-3">
                      <Input
                        placeholder="Enter ingredient name"
                        required
                        className="border-gray-600 h-10"
                        value={ingredientName}
                        onChange={(event) =>
                          handleEditFormIngredientNameChange(
                            setIndex,
                            index,
                            event.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Enter ingredient price"
                        required
                        type="number"
                        className="border-gray-600 h-10"
                        value={ingredientSet.ingredientPrice[index]}
                        onChange={(event) =>
                          handleEditFormIngredientPriceChange(
                            setIndex,
                            index,
                            event.target.value
                          )
                        }
                      />
                      {/* {index >= 0 && (
                        <Button
                          type="link"
                          danger={true}
                          onClick={() =>
                            handleRemoveEditFormIngredientSet(ingredientSet._id)
                          }
                        >
                          Remove
                        </Button>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* <Button type="primary" onClick={handleAddEditFormIngredientSet}>
              Add another set of ingredients
            </Button> */}
          </Form.Item>

          <Form.Item label="Sizes">
            {editFormData.sizes.map((sizeSet, setIndex) => (
              <div key={setIndex}>
                {sizeSet.sizeName.map((size, sizeIndex) => (
                  <div key={`${setIndex}-${sizeIndex}`}>
                    <div className="flex flex-row items-center w-full">
                      <label className="text-sm text-gray-500">Size Name</label>
                      <label className="text-sm text-gray-500 md:ml-[180px] max-md:ml-10">
                        Percentage
                      </label>
                    </div>
                    <div className="mb-3 flex flex-row gap-3">
                      <Input
                        placeholder="Enter size name"
                        required
                        className="border-gray-600 h-10"
                        value={size}
                        onChange={(event) =>
                          handleSizeNameChange(
                            setIndex,
                            sizeIndex,
                            event.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Enter size percentage"
                        required
                        type="number"
                        className="border-gray-600 h-10"
                        value={sizeSet.percentage[sizeIndex]}
                        onChange={(event) =>
                          handleSizePercentageChange(
                            setIndex,
                            sizeIndex,
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Form.Item>

          <Form.Item label="Image">
            <Input
              onChange={handleImage}
              type="file"
              id="formupload"
              name="image"
              className="border-black"
              required
            />
            {image ? <Image width={150} height={150} src={image} className="mt-2 rounded-md" /> : null}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuList;
