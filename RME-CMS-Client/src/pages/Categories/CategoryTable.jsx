import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { List, Button, Input, Modal } from "antd";
import "react-toastify/dist/ReactToastify.css";

// Fetching data from the api
async function fetchData(setData) {
  try {
    const response = await axios.get("http://localhost:3000/api/categories");
    const data = response.data;
    const formattedData = data.map((item, index) => ({
      ...item,
      key: index,
    }));
    setData(formattedData);
    console.log(formattedData);
  } catch (error) {
    console.error(error);
    // Handle the error, for example, display a toast message
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

const CategoryTable = ({ newCategory }) => {
  const [data, setData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData(setData);
  }, [newCategory]);

  // Deleting listed data from the table
  const deleteItem = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:3000/api/categories/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Refetch data after successful deletion
        fetchData(setData);
      } else {
        throw new Error("Failed to delete category");
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

  const editItem = (category) => {
    setEditCategory(category);
    setEditCategoryName(category.categoryName);
    setVisible(true);
  };

  // Update category
  const updateCategory = async () => {
    try {
      // Check if the category name has changed
      if (editCategoryName !== editCategory.categoryName) {
        const response = await axios.put(
          `http://localhost:3000/api/categories/${editCategory._id}`,
          {
            categoryName: editCategoryName,
          }
        );
        if (response.status === 200) {
          toast.success("Category updated successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setEditCategory(null);
          fetchData(setData);
          setVisible(false);
        } else {
          throw new Error("Failed to update category");
        }
      } else {
        setEditCategory(null);
        setVisible(false);
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

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="flex justify-start flex-col">
      <h1>Categories</h1>
      <div>
        <List
          header={
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-lg text-gray-500">Category Name</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Created At</p>
              </div>
              <div>
                <p className="text-lg text-gray-500">Actions</p>
              </div>
            </div>
          }
        >
          {/* List all fetched items */}
          {data.map((category) => (
            <List.Item key={category._id}>
              <div className="flex flex-row">
                <h3>{category.categoryName}</h3>
              </div>
              <div className="justify-end flex flex-row pt-2 items-center">
                <Button className="mr-3" onClick={() => editItem(category)}>
                  Edit
                </Button>
                <Button
                  className="mr-3"
                  danger={true}
                  onClick={() => deleteItem(category._id)}
                >
                  Delete
                </Button>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
      <Modal
        title="Edit Category"
        open={visible}
        onOk={updateCategory}
        onCancel={handleCancel}
      >
        <Input
          value={editCategoryName}
          onChange={(e) => setEditCategoryName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CategoryTable;
