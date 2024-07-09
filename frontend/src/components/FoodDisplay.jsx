import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="">
      <h2 className="text-xl font-semibold">Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;