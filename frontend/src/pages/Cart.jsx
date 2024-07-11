import { Table } from "flowbite-react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function Cart() {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  return (
    <div className="max-w-6xl px-4 mx-auto">
      <div className="overflow-x-auto hideScrollBar">
        <Table className="text-center whitespace-nowrap">
          <Table.Head>
            <Table.HeadCell>Items</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Total</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {food_list.map((item) => {
              if (cartItems[item._id]) {
                return (
                  <Table.Row
                    key={item._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        src={item.image}
                        className="w-24 h-14 mx-auto object-cover"
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>${item.price}</Table.Cell>
                    <Table.Cell>{cartItems[item._id]}</Table.Cell>
                    <Table.Cell>${item.price * cartItems[item._id]}</Table.Cell>
                    <Table.Cell
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer"
                    >
                      X
                    </Table.Cell>
                  </Table.Row>
                );
              }
              return null;
            })}
          </Table.Body>
        </Table>
      </div>
      {/* cart bottom */}
      <div
        className="mt-20 flex justify-between flex-col md:flex-row"
        style={{ gap: "max(6vw,20px)" }}
      >
        <div className="flex-1 border p-6">
          <h1 className="text-xl font-semibold">Card Totals</h1>
          <div className="my-4">
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button
            className="uppercase text-white bg-orange-500 py-3 rounded-[4px] cursor-pointer"
            style={{ width: "max(20vw,200px)" }}
          >
            Proceed To Checkout
          </button>
        </div>
        {/* Promo Code */}
        <div className="w-full md:max-w-sm p-6 border border-gray-200 rounded bg-white">
          <h2 className="text-xl font-semibold mb-6">Promo Code</h2>
          <p className="text-gray-700 mb-4">
            If you have a promo code, enter it here:
          </p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500 transition duration-300"
            />
            <button className="py-3 px-6 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
