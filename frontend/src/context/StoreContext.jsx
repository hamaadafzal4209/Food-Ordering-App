import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user._id || "";
  });
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:8000";

  const addToCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        const updated = { ...prev };
        if (!updated[itemId]) {
          updated[itemId] = 1;
        } else {
          updated[itemId] += 1;
        }
        return updated;
      });

      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        const updated = { ...prev };
        if (updated[itemId] > 1) {
          updated[itemId] -= 1;
        } else {
          delete updated[itemId];
        }
        return updated;
      });

      if (token) {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Error removing item from cart");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.error(`Item with ID ${item} not found in food_list.`);
          toast.error(`Item with ID ${item} not found in food_list.`);
        }
      }
    }
    return totalAmount.toFixed(2);
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
      console.log("Food list fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching food list");
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });
      setCartItems(response.data.cartData || {});
      console.log("Cart data loaded:", response.data.cartData);
    } catch (error) {
      console.error(
        "Error loading cart data:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Error loading cart data");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
      if (storedUserId) {
        setUserId(storedUserId);
      }
      console.log("Loaded data:", { token: storedToken, userId: storedUserId });
    }
    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userId,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
