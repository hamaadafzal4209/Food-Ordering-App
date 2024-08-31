import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { Spinner } from "flowbite-react"; // Import Spinner from Flowbite

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchOrders = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching or if an error occurs
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders().catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
    }
  }, [token]);

  return (
    <div className="p-4 mb-8">
      <h2 className="text-2xl font-semibold text-center mb-6">My Orders</h2>
      <div className="sm:px-[5%] mx-auto">
        {isLoading ? ( // Show loader while loading
          <div className="flex justify-center items-center h-64">
            <Spinner aria-label="Loading orders..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Items
                  </th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Amount
                  </th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Items Count
                  </th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {data.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 whitespace-nowrap">
                      <ul>
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            {item.name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      ${order.amount}.00
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      {order.items.length}
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <span className="text-green-600">
                        &#x25cf; <b>{order.status}</b>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
