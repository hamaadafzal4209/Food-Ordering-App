import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavComponent } from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
