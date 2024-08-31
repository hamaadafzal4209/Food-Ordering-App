import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mb-12">
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image.url}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
