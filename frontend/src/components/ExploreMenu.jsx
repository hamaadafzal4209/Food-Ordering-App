import { menu_list } from "../assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="pt-10" id="explore-menu">
      <h1 className="text-3xl font-semibold pb-4">Explore our menu</h1>
      <p className="max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus iusto
        aliquid molestias unde commodi consequuntur deleniti quasi, fugiat
        inventore reiciendis!
      </p>
      <div className="flex gap-4 overflow-x-auto no-scrollbar my-6 sm:my-8">
        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded-full text-white whitespace-nowrap font-semibold ${
            category === "All" ? "bg-green-500" : "bg-gray-400 hover:bg-gray-400"
          }`}
        >
          All
        </button>
        {menu_list.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className={`px-4 py-2 rounded-full text-white whitespace-nowrap font-semibold ${
              category === item.menu_name
                ? "bg-green-500"
                : "bg-gray-400 hover:bg-gray-400"
            }`}
          >
            {item.menu_name}
          </button>
        ))}
      </div>
      <hr className="mt-4 h-[2px] bg-[#e2e2e2] border-none" />
    </div>
  );
}

export default ExploreMenu;
