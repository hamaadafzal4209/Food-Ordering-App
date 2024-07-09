import { menu_list } from "../assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="py-10 max-w-6xl px-4 mx-auto overflow-hidden">
      <h1 className="text-3xl font-semibold pb-4">Explore our menu</h1>
      <p className="text-balance">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus iusto
        aliquid molestias unde commodi consequuntur deleniti quasi, fugiat
        inventore reiciendis!
      </p>
      <div className="flex items-center gap-8 overflow-x-scroll hideScrollBar my-8 sm:my-12">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className=""
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              className={
                category === item.menu_name
                  ? "border-[4px] rounded-full w-[8vw] min-w-[80px] p-[2px] border-orange-500"
                  : "w-[8vw] min-w-[80px] rounded-full cursor-pointer"
              }
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p className="text-[#747474] text-center pt-1 text-base sm:text-lg">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <hr className="mt-[10px] h-[2px] bg-[#e2e2e2] border-none" />
    </div>
  );
}

export default ExploreMenu;
