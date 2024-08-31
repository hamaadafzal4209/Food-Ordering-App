import { useState } from "react";
import { admin_assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";

function DashAddItem() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading state

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/food/add",
        formData
      );

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the item.");
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <div className="p-8 flex flex-col items-center border-l border-black min-h-screen h-full">
      <form className="w-full max-w-lg text-[#6d6d6d]" onSubmit={handleSubmit}>
        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={
                image ? URL.createObjectURL(image) : admin_assets.upload_area
              }
              alt="Upload"
              className="w-28"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-lg font-semibold">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-semibold"
          >
            Product Description
          </label>
          <textarea
            rows="6"
            name="description"
            id="description"
            placeholder="Write content here.."
            value={data.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          ></textarea>
        </div>

        <div className="flex sm:gap-10 flex-col sm:flex-row">
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-lg font-semibold"
            >
              Product Category
            </label>
            <select
              name="category"
              id="category"
              value={data.category}
              onChange={handleChange}
              className="max-w-[200px] w-full p-2 border border-gray-300"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-lg font-semibold">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="$"
              value={data.price}
              onChange={handleChange}
              className="max-w-[200px] w-full p-2 border border-gray-300"
              required
            />
          </div>
        </div>

        <Button type="submit" gradientMonochrome="info" isProcessing={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default DashAddItem;