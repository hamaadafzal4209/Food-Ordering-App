import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "flowbite-react"; // Import spinner from Flowbite or any other spinner component

const DashOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchAllOrders = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get("http://localhost:8000/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setIsLoading(false); // Set loading to false after fetching or if an error occurs
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/status",
        {
          orderId,
          status: event.target.value,
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full p-5 sm:px-10 border-l border-black min-h-screen h-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Orders</h3>
      {isLoading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-64">
          <Spinner aria-label="Loading orders..." />
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium">
                  Items
                </th>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium hidden sm:table-cell">
                  Address
                </th>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium">
                  Items Count
                </th>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm whitespace-nowrap font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700 divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm whitespace-nowrap ">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {itemIndex + 1}. {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap hidden sm:table-cell">
                    <div>
                      {order.address.firstName} {order.address.lastName}
                    </div>
                    <div>{order.address.street}</div>
                    <div>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipcode}
                    </div>
                    <div>{order.address.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">{order.items.length}</td>
                  <td className="py-3 px-4 text-sm">${order.amount}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="text-green-600">{order.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className="border border-gray-300 rounded-lg py-1 px-2 text-gray-700 text-sm"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashOrders;
