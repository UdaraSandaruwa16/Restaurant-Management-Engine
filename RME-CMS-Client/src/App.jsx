import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignedOut, SignedIn } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Categories from "./pages/Categories/Categories";
import MenuItems from "./pages/Menu-items/MenuItems";
import NavBar from "./Components/NavBar";
import ComboPlanes from "./pages/ComboPlanes/ComboPlanes";
import TableReservation from "./pages/TableReservation/TableReservation";
import DesignCustomization from "./pages/DesignCustomization/DesignCustomization";
import LandingPage from "./pages/AI/LandingPage";
import SignIn from "./pages/SignIn/SignIn";

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
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/menu-items" element={<MenuItems />} />
            <Route path="/combo-planes" element={<ComboPlanes />} />
            <Route path="/table-reservation" element={<TableReservation />} />
            <Route
              path="/design-custormization"
              element={<DesignCustomization />}
            />
            <Route path="/the-phoenix-era" element={<LandingPage />} />
          </Routes>
        </Router>
      </SignedIn>
    </main>
  );
}

export default App;
