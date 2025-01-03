import React, { useEffect, useState } from "react";
import { Input, Button, Divider } from "antd";
import { fetchTableData, handleNewTableSubmit } from "../utils/fetchTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableList from "./TableList";

const TableReservation = () => {
  const [tableReservation, setTableReservation] = useState([]);
  const [prevValidNumber, setPrevValidNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [capasity, setCapasity] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchTableData().then((data) => {
      setTableReservation(data);
    });
  }, [tableReservation]);

  // console.log(tableReservation.map((item) => item.number));

  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setTableNumber(value);
      try {
        const available = await checkTableAvailability(value);
        setIsAvailable(available);
        if (!available) {
          toast.error("Table number already exists");
        }
      } catch (error) {
        console.error("Error checking table availability:", error);
      }
    } else {
      setTableNumber(prevValidNumber);
    }
  };

  const handleCapasityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setCapasity(value);
    } else {
      setCapasity(prevValidNumber);
    }
  };

  const handleBlur = () => {
    setPrevValidNumber(tableNumber);
  };

  const handleCapasityBlur = () => {
    setPrevValidNumber(capasity);
  };

  const checkTableAvailability = async (tableNumber) => {
    // Check if the table number exists in the list of reserved tables
    return !tableReservation.some(
      (item) => item.number === parseInt(tableNumber)
    );
  };

  const handleSaveTable = (e) => {
    e.preventDefault();
    handleNewTableSubmit(tableNumber, capasity);
  };

  return (
    <section className="max-container w-full sm:px-11 max-sm:px-8">
      <div className="flex flex-col w-full md:flex-row md:gap-2">
        <div className="md:w-1/2 w-full">
          <form>
            <label className="text-lg mt-3">Enter table number</label>
            <Input
              placeholder="Table number"
              required={true}
              type="number"
              value={tableNumber}
              onChange={handleInputChange}
              className="w-full border-gray-600 h-10 mb-3"
              onBlur={handleBlur}
            />
            <label className="text-lg mt-3">Enter capacity</label>
            <Input
              placeholder="Capacity"
              required={true}
              type="number"
              className="w-full border-gray-600 h-10 mb-3"
              value={capasity}
              onChange={handleCapasityChange}
              onBlur={handleCapasityBlur}
            />
            <Button
              htmlType="submit"
              className="bg-orange-500"
              onClick={handleSaveTable}
              disabled={!isAvailable}
            >
              Save table
            </Button>
          </form>
        </div>
      </div>
      <Divider />
      <h3 className="mt-2 mb-3">Table List</h3>
      <TableList />
      <ToastContainer />
    </section>
  );
};

export default TableReservation;
