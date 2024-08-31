import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner } from "flowbite-react"; // Import Spinner from Flowbite
import { toast } from "react-toastify";

function DashLists() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchList = async () => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get("http://localhost:8000/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false); // Set loading to false after fetching or if an error occurs
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeItem = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/food/remove", {
        id: foodId,
      });
      if (response.data.success) {
        await fetchList();
        toast.success("Item removed successfully");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full p-5 px-5 sm:px-10 border-l border-black min-h-screen h-full">
      <h2 className="text-lg font-semibold pb-4">All Foods List</h2>
      {isLoading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-64">
          <Spinner aria-label="Loading foods..." />
        </div>
      ) : (
        <div className="overflow-x-auto hideScrollBar">
          <Table className="text-center">
            <Table.Head className="bg-[#f9f9f9] whitespace-nowrap flex-shrink-0">
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {list.map((item) => (
                <Table.Row
                  key={item._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    <img
                      src={item.image.url}
                      className="min-w-24 h-12 mx-auto object-cover whitespace-nowrap flex-shrink-0"
                      alt={item.name}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>${item.price}</Table.Cell>
                  <Table.Cell
                    onClick={() => removeItem(item._id)}
                    className="cursor-pointer"
                  >
                    X
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

export default DashLists;