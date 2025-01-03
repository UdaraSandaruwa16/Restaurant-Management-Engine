import React, { useEffect, useState } from "react";
import GetOrderDropDown from "./GetOrderDropDown";
import { Table } from "antd";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { handleStatusUpdate } from "../../utilities/orderStatus";

const { Column } = Table;

const OrderStatus = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderData, setOrderData] = useState({ cartProduct: [] });

  useEffect(() => {
    async function getPendingOrders(itemId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/kitchen/${itemId}`
        );
        if (response.status === 200) {
          setOrderData(response.data);
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

    if (
      selectedItem &&
      typeof selectedItem === "object" &&
      selectedItem.value
    ) {
      getPendingOrders(selectedItem.value);
    }
  }, [selectedItem]);

  function handleStatus(record) {
    const mainOrderId = orderData._id;
    console.log("Main Order ID:", mainOrderId);
    handleStatusUpdate(mainOrderId);
  }
  
  return (
    <div className="max-container mt-3">
      <h3 className="text-start pb-4">Pending Orders Id</h3>
      <GetOrderDropDown
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <Table dataSource={orderData.cartProduct}>
        <Column
          title="Item Name"
          dataIndex="itemName"
          key="itemName"
          render={(text, record) => record.itemName}
        />
        <Column
          title="Quantity"
          dataIndex="qty"
          key="qty"
          render={(text, record) => record.qty}
        />
        <Column
          title="Size Name"
          dataIndex="sizes"
          key="sizes"
          render={(text, record) =>
            record.sizes.map((size) => size.sizeName).join(", ")
          }
        />
        <Column
          title="Ingredient Name"
          dataIndex="extraIngredients"
          key="extraIngredients"
          render={(text, record) =>
            record.extraIngredients
              .map((ingredient) => ingredient.ingredientName)
              .join(", ")
          }
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a className="text-blue-500" onClick={() => handleStatus(record)}>
                Complete
              </a>
            </span>
          )}
        />
      </Table>
      <ToastContainer />
    </div>
  );
};

export default OrderStatus;
