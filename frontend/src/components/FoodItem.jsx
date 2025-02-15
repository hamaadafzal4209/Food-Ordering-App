/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const {
    cartItems = {},
    addToCart,
    removeFromCart,
  } = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  return (
    <div
      className="animate-fadeIn w-full m-auto rounded-[15px]"
      style={{ boxShadow: "0px 0px 10px #0000001f" }}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-tr-[15px] rounded-tl-[15px]"
        />
        {!itemCount ? (
          <img
            className="cursor-pointer absolute w-[35px] bottom-[15px] right-[15px] rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-full bg-white">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
              className="w-[30px] cursor-pointer"
            />
            <p className="cartitemsp">{itemCount}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
              className="w-[30px] cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-[20px] font-medium line-clamp-1">{name}</h3>
        </div>
          <img className="w-[70px] mb-2" src={assets.rating_starts} alt="Rating" />
        <p className="text-[#676767] text-sm line-clamp-2">{description}</p>
        <p className="text-[#FF6347] font-medium text-xl my-[10px]">${price}</p>
      </div>
    </div>
  );
}
export default FoodItem;
