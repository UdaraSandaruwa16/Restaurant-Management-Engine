import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Modal, Form, Input } from "antd";
import {
  fetchTableData,
  handleTableDelete,
  handleTableUpdate,
} from "../utils/fetchTable";
const { Column, ColumnGroup } = Table;
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableList = () => {
  const [tableList, setTableList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    number: "",
    capacity: "",
  });

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEdit = (record) => {
    setSelectedItem(record);
    setEditFormData({
      number: record.number,
      capacity: record.capacity,
    });
    setVisible(true);
  };

  useEffect(() => {
    fetchTableData().then((data) => setTableList(data));
  }, [tableList]);

  function handleDelete(record) {
    handleTableDelete(record);
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/table/${selectedItem._id}`,
        editFormData
      );
      if (response.status === 200) {
        toast.success("Item updated successfully");
        setVisible(false);
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

  return (
    <div>
      <div>
        <Table dataSource={tableList}>
          <Column
            title="Table Number"
            dataIndex="number"
            key="number"
            render={(number) => <p key={number}>{number}</p>}
          />
          <Column
            title="Table Capasity"
            dataIndex="capacity"
            key="capacity"
            render={(capacity) => <p key={capacity}>{capacity}</p>}
          />
          <Column
            title="Area"
            dataIndex="area"
            key="area"
            render={(area) => (
              <Tag color="blue" key={area}>
                {area}
              </Tag>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a onClick={() => handleEdit(record)}>Edit</a>
                <a
                  onClick={() => handleDelete(record)}
                  className="text-red-500"
                >
                  Delete
                </a>
              </Space>
            )}
          />
        </Table>
      </div>
      <Modal
        title="Edit Item"
        open={visible}
        onOk={handleUpdate}
        onCancel={() => setVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Table Number">
            <Input
              name="number" // Corrected name attribute
              value={editFormData.number}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Table Capacity">
            <Input
              name="capacity" // Corrected name attribute
              value={editFormData.capacity}
              onChange={handleEditFormChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableList;
