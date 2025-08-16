import { getCategories } from "@/lib/queries";
import Canvas from "./components/Canvas";
import Navbar from './components/Navbar';

export default async function Home({ children }:
  { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <Canvas />
      <Navbar categories={categories} />
      <div className="mt-24 lg:mt-40 mx-auto lg:w-[90vw]" >
        {children}
      </div >
    </>
  );
}
