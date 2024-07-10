import { Table } from "flowbite-react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function Cart() {
  const { food_list, cartItems, removeFromCart } = useContext(StoreContext);

  return (
    <div className="max-w-6xl px-4 mx-auto">
      <div className="overflow-x-auto hideScrollBar">
        <Table className="text-center whitespace-nowrap">
          <Table.Head className="border-b-[2px] border-gray-300 ">
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
        style={{ gap: "max(12vw,20px)" }}
      >
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Card Totals</h1>
          <div className="my-4">
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr className="my-[10px]" />
            <div className="flex justify-between gap-5 text-[#555]">
              <b>Total</b>
              <b>{0}</b>
            </div>
          </div>
          <button
            className="uppercase text-white bg-orange-500 py-3 rounded-[4px] cursor-pointer"
            style={{ width: "max(20vw,200px)" }}
          >
            Proceed To Checkout
          </button>
        </div>
        {/* cart promo code */}
        <div className="flex-1">
          <div className="">
            <p className="text-[#555]">
              If you have a promo code, Enter it here
            </p>
            <div className="mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px] ">
              <input
                type="text"
                name=""
                className="bg-transparent border-none outline-none pl-[10px] focus:border-none focus:outline-none"
                placeholder="Promo Code"
                id=""
              />
              <button
                style={{ widows: "max(10vw, 150px)" }}
                className="px-[12px] py-[5px] bg-black text-white rounded-[4px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
