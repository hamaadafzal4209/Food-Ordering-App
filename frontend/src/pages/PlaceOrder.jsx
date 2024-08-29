import { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Prepare order items
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    // Prepare order data
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Adding delivery fee
    };

    try {
      // Send order data to backend
      const response = await axios.post(
        "http://localhost:8000/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        // Redirect to Stripe checkout
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("An error occurred while placing the order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order");
    }
  };

  return (
    <div className="w-full md:w-[90%] px-4 mx-auto">
      <form
        onSubmit={placeOrder}
        className="flex flex-col md:flex-row gap-12 lg:gap-32 mt-4 mb-20"
      >
        {/* Left */}
        <div className="flex-1">
          <p className="text-xl sm:text-3xl font-semibold mb-8">Delivery Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              className="p-3 border rounded-md w-full"
            />
            <input
              required
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            className="p-3 border rounded-md w-full mt-4"
          />
          <input
            required
            type="text"
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            placeholder="Street"
            className="p-3 border rounded-md w-full mt-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              required
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="City"
              className="p-3 border rounded-md w-full"
            />
            <input
              required
              type="text"
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              required
              type="text"
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip Code"
              className="p-3 border rounded-md w-full"
            />
            <input
              required
              type="text"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <input
            required
            type="text"
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            className="p-3 border rounded-md w-full mt-4"
          />
        </div>
        {/* Right */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-semibold mb-6">Cart Totals</h1>
          <div className="my-4">
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button
            type="submit"
            className="uppercase text-white bg-orange-500 py-3 mt-4 rounded-md max-w-60 w-full font-semibold"
          >
            Proceed To Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;