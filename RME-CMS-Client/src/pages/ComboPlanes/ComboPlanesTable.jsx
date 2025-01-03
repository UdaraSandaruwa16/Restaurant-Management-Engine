import { useState } from "react";
import { useEffect } from "react";
import { Space, Table, Image, Modal, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Column, ColumnGroup } = Table;

import { fetchCombo, handleComboDelete, handleComboUpdate } from "../utils/fetchCombo";

const ComboPlanesTable = () => {
  const [comboList, setComboList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [editFormData, setEditFormData] = useState({
    comboPlanName: "",
    description: "",
    price: "",
    items: [],
    image: "",
  });

  const handleEdit = (record) => {
    setSelectedItem(record);
    setEditFormData({
      comboPlanName: record.comboPlanName,
      basePrice: record.basePrice,
      description: record.description,
      price: record.price,
      items: record.items,
      image: record.imageURL,
    });
    setImage(record.imageURL);
    setEditModalVisible(true);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCombo();
      setComboList(data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval); 
  }, [comboList]);

  function handleDelete(record) {
    handleComboDelete(record);
  }


  // Function to handle changing the name of an ingredient
  const handleEditFormitemNameChange = (setIndex, index, value) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      items: prevFormData.items.map((itemSet, i) =>
        i === setIndex
          ? {
              ...itemSet,
              itemName: itemSet.itemName.map((name, j) =>
                j === index ? value : name
              ),
            }
          : itemSet
      ),
    }));
  };

  // Function to handle changing the price of an ingredient
  const handleEditFormbasePriceChange = (setIndex, index, value) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      items: prevFormData.items.map((itemSet, i) =>
        i === setIndex
          ? {
              ...itemSet,
              basePrice: itemSet.basePrice.map((price, j) =>
                j === index ? value : price
              ),
            }
          : itemSet
      ),
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
      setImage(reader.result); 
    };
  };

  async function handleUpdate () {
    handleComboUpdate(editFormData, image, setEditModalVisible, selectedItem);
  }

  return (
    <div className="flex items-center min-w-full">
      <Table dataSource={comboList} style={{ width: "100%" }}>
        <Column
          title="Combo item name"
          dataIndex="comboPlanName"
          key="comboPlanName"
        />
        <Column
          title="Combo item description"
          dataIndex="description"
          key="description"
          width={500}
        />
        <ColumnGroup title="Item name and price">
          <Column
            title="Item name"
            dataIndex="items"
            key="items"
            render={(items) => (
              <>
                {items.map((itemObj, index) => (
                  <div key={index}>
                    {itemObj.itemName.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
          <Column
            title="Item name"
            dataIndex="items"
            key="items"
            render={(items) => (
              <>
                {items.map((itemObj, index) => (
                  <div key={index}>
                    {itemObj.basePrice.map((price, idx) => (
                      <p key={idx}>{price}</p>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
        </ColumnGroup>
        <Column title="Final" dataIndex="price" key="price" />
        <Column
          title="Image"
          key="imageURL"
          className="flex justify-center items-center"
          render={(record) => (
            <Image
              src={record.imageURL}
              className="rounded-md"
              width={200}
              alt={record.itemName}
            />
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a className="text-red-500" onClick={() => handleDelete(record)}>
                Delete
              </a>
              <a onClick={() => handleEdit(record)}>Edit</a>
            </Space>
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
              value={editFormData.comboPlanName}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Base Price">
            <Input
              name="basePrice"
              value={editFormData.price}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:border-blue-500"
              placeholder="Write your thoughts here..."
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Extra Ingredient">
            {editFormData.items.map((itemSet, setIndex) => (
              <div key={itemSet._id}>
                {itemSet.itemName.map((itemName, index) => (
                  <div key={`${itemSet._id}-${index}`}>
                    <div className="flex flex-row items-center w-full">
                      <label className="text-sm text-gray-500">Item Name</label>
                      <label className="text-sm text-gray-500 md:ml-[145px] max-md:ml-10">
                        Price
                      </label>
                    </div>
                    <div className="mb-3 flex flex-row gap-3">
                      <Input
                        placeholder="Enter item name"
                        required
                        className="border-gray-600 h-10"
                        value={itemName}
                        onChange={(event) =>
                          handleEditFormitemNameChange(
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
                        value={itemSet.basePrice[index]}
                        onChange={(event) =>
                          handleEditFormbasePriceChange(
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
                            handleRemoveEditFormitemSet(itemSet._id)
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
            {/* <Button type="primary" onClick={handleAddEditFormitemSet}>
              Add another set of ingredients
            </Button> */}
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
            {image ? (
              <Image
                width={150}
                height={150}
                src={image}
                className="mt-2 rounded-md"
              />
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComboPlanesTable;
