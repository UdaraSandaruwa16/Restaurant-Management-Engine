import React, { useEffect, useState } from "react";
import { fetchKitchenItems, handleOrderStatus } from "../utilities/orderList";
import { Table } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tag } from "antd";

const { Column } = Table;

const OrderList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchKitchenItems().then((data) => {
      setItems(data);
    });
    console.log(items);
  }, [items]);

  function handleReady(record) {
    const selectedItemId = record._id;
    console.log("Selected Item ID:", selectedItemId);
    handleOrderStatus(selectedItemId);
  }

  return (
    <div className="max-container w-full min-h-screen">
      <h3 className="mb-3">Change Item Status</h3>
      <Table dataSource={items} bordered style={{ width: "100%" }}>
        <Column title="Item Name" dataIndex="itemName" key="itemName" />
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
          title="Item Availability"
          dataIndex="itemAvailable"
          key="itemAvailable"
          render={(itemAvailable) => (
            <Tag color={itemAvailable ? "green" : "red"}>
              {String(itemAvailable).toUpperCase()}
            </Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a className="text-blue-500" onClick={() => handleReady(record)}>
                Change Status
              </a>
            </span>
          )}
        />
      </Table>
      <ToastContainer />
    </div>
  );
};

export default OrderList;
