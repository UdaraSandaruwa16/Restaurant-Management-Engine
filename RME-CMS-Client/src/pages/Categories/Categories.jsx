import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryTable from "./CategoryTable";

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");

  async function handleNewCategorySubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategory }),
      });
      if (response.ok) {
        toast.success("Category created successfully");
        setNewCategory("");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
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

  return (
    <section className="max-container sm:px-11 max-sm:px-8">
      <form onSubmit={handleNewCategorySubmit} className="mb-10">
        <div className="flex flex-col">
          <label className="text-lg">Category Name</label>
          <div className="flex gap-5 items-center">
            <Input
              placeholder="Pizza"
              required={true}
              type="text"
              className="md:w-[50vh] border-gray-600 h-10"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              htmlType="submit"
              className="w-[155px] h-10 bg-orange-500 text-lg font-semibold"
            >
              Add
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition:Bounce
            />
          </div>
        </div>
      </form>
      <CategoryTable newCategory={newCategory} />
    </section>
  );
};

export default Categories;
