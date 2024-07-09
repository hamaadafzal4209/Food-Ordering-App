import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavComponent } from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  return (
    <div className="max-w-6xl px-4 mx-auto overflow-hidden">
      <BrowserRouter>
        <NavComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
