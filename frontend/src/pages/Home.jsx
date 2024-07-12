import { useState } from "react";
import ExploreMenu from "../components/ExploreMenu";
import Header from "../components/Header";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div className="w-full md:w-[90%] px-4 mx-auto overflow-hidden">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

export default Home;
