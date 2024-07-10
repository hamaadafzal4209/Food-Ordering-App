import { useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import Header from "../components/Header";
import FoodDisplay from "../components/FoodDisplay";

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div className="max-w-6xl px-4 mx-auto overflow-hidden">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
}

export default Home;
