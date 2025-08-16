import Canvas from "./components/Canvas";
import Navbar from './components/Navbar';

export default async function Home({ children }:
  { children: React.ReactNode }) {

  return (
    <>
      <Canvas />
      <Navbar />
      <div className="mt-24 lg:mt-40 mx-auto lg:w-[90vw]" >
        {children}
      </div >
    </>
  );
}
