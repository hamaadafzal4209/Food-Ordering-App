import { admin_assets } from "../assets/assets";

function DashAddItem() {
  return (
    <div className="p-8 flex flex-col items-center">
      <form className="w-full text-[#6d6d6d]">
        <div className="mb-6">
          <p className="mb-2 text-lg font-semibold">Upload Image</p>
          <label
            htmlFor="image"
            className="cursor-pointer"
          >
            <img src={admin_assets.upload_area} alt="Upload" className="w-28" />
          </label>
          <input type="file" id="image" hidden required />
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
            className="w-full p-2 border border-gray-300"
            required
          ></textarea>
        </div>

    <div className="flex md:gap-10 flex-col sm:flex-row">
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
            placeholder="$20"
            className="max-w-[200px] w-full p-2 border border-gray-300"
            required
          />
        </div>
    </div>

        <button
          type="submit"
          className="w-[200px] py-3 bg-black text-white font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default DashAddItem;
