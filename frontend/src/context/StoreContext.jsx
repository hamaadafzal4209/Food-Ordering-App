import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      await axios.post(
        "http://localhost:8000/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };  

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1;
      if (newCount > 0) {
        return { ...prev, [itemId]: newCount };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
    if (token) {
      await axios.post(
        "http://localhost:8000/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };  

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodLists = async () => {
    const response = await axios.get("http://localhost:8000/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(
      "http://localhost:8000/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {}); // Ensure cartData is an object
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodLists();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;