import Carousel from "./components/Carousel";
import Categories from "./components/Categories";
import { getCarousels, getCategories } from "@/lib/queries";

export default async function Home() {
  const categories = await getCategories();
  const carousels = await getCarousels();
  return (
    <>
      <Carousel carousels={carousels} />
      <Categories categories={categories} />
    </>
  );
}
