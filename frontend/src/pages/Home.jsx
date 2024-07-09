import { useState } from "react"
import ExploreMenu from "../components/ExploreMenu"
import Header from "../components/Header"

function Home() {

  const [category,setCategory] = useState("All")
  
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  )
}

export default Home
