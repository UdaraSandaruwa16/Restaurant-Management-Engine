import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import "./index.css";
import Navbar from "./Components/Navbar";
import OrderList from "./Pages/OrderList";
import OrderStatus from "./Pages/Order-status/OrderStatus";
import SignIn from "./Pages/SignIn/SignIn";

function App() {
  return (
    <main className="h-full w-full">
      <SignedOut>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </Router>
      </SignedOut>
      <SignedIn>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/order-status" element={<OrderStatus />} />
          </Routes>
        </Router>
      </SignedIn>
    </main>
  );
}

export default App;
