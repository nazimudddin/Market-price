import Image from "next/image";
import Marquee from "./components/Marquee";
import HomePage from "./components/Home";
import Mainsection from "./components/Mainsection";
import Allproducts from "./components/Allproducts";

export default function Home() {
  return (
  <div className="bg-background/70">

    <HomePage></HomePage>
    <Mainsection></Mainsection>
    <Allproducts></Allproducts>
  </div>
  );
}
