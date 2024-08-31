import axios from "axios";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(false);
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

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: userId.trim(),
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Add delivery fee
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        toast.success("Order placed successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error placing order");
    } finally {
      setIsLoading(false);
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
          <p className="text-xl sm:text-3xl font-semibold mb-8">
            Delivery Information
          </p>
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
          <h1 className="text-xl sm:text-3xl font-semibold mb-6">
            Cart Totals
          </h1>
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
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            size="lg"
            isProcessing={isLoading}
            className="uppercase text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              "Proceed To Payment"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;