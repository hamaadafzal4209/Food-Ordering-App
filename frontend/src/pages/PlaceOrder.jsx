import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="max-w-6xl px-4 mx-auto">
      <form className="flex flex-col md:flex-row gap-12 lg:gap-32 mt-4 mb-20">
        {/* left */}
        <div className="flex-1">
          <p className="text-xl sm:text-3xl font-semibold mb-8">
            Delivery Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="p-3 border rounded-md w-full mt-4"
          />
          <input
            type="text"
            placeholder="Street"
            className="p-3 border rounded-md w-full mt-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="City"
              className="p-3 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Zip Code"
              className="p-3 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="p-3 border rounded-md w-full mt-4"
          />
        </div>
        {/* right */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-semibold mb-6">
            Card Totals
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
          <button className="uppercase text-white bg-orange-500 py-3 mt-4 rounded-md max-w-60 w-full font-semibold">
            Proceed To payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
