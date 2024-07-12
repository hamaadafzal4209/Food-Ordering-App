import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import { toast } from "react-toastify";

function DashLists() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeItem = async (foodId) => {
    const response = await axios.post("http://localhost:8000/api/food/remove", {
      id: foodId,
    });
    try {
      await fetchList();
      if (response.data.success) {
        toast.success("Item removed successfully");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full p-5 px-5 sm:px-10 border-l border-black min-h-screen h-full">
      <h2 className="text-lg font-semibold pb-4">All Foods List</h2>
      <div className="overflow-x-auto hideScrollBar">
        <Table className="text-center whitespace-nowrap">
          <Table.Head className="bg-[#f9f9f9]">
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
                    src={`http://localhost:8000/images/` + item.image}
                    className="w-24 h-12 mx-auto object-cover"
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
    </div>
  );
}

export default DashLists;
