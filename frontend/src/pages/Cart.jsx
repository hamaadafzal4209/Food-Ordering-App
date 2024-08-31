import { useContext, useState } from "react";
import { Button, Table, Spinner } from "flowbite-react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleRemoveFromCart = (itemId) => {
    console.log("Removing item:", itemId);
    setIsLoading(true);
    removeFromCart(itemId).finally(() => {
      setIsLoading(false);
    });
  };

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0;

  return (
    <div className="w-full md:w-[90%] mt-6 md:mt-14 px-4 mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner aria-label="Loading..." />
        </div>
      ) : isCartEmpty ? ( 
        <div className="flex flex-col items-center justify-center h-64">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiQrWU1_XPl-elP1fso3jrcZDEk_d4x-wlg&s" 
            alt="Empty Cart"
            className="w-48 h-auto"
          />
          <p className="text-gray-600 mb-20">Your cart is empty</p>
        </div>
      ) : (
        <>
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
                            src={`${item.image.url}`}
                            className="w-24 h-14 mx-auto object-cover"
                            alt={item.name}
                          />
                        </Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>${item.price}</Table.Cell>
                        <Table.Cell>{cartItems[item._id]}</Table.Cell>
                        <Table.Cell>${item.price * cartItems[item._id]}</Table.Cell>
                        <Table.Cell
                          onClick={() => handleRemoveFromCart(item._id)}
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
            className="my-20 flex justify-between flex-col lg:flex-row"
            style={{ gap: "max(3vw,20px)" }}
          >
            {/* cart total */}
            <div className="flex-1 border p-6">
              <h1 className="text-xl font-semibold">Cart Totals</h1>
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
                onClick={() => navigate("/order")}
                gradientDuoTone="purpleToBlue"
                size="lg"
                className="uppercase text-white font-semibold"
              >
                Proceed To Checkout
              </Button>
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
        </>
      )}
    </div>
  );
}

export default Cart;