import Home from "./components/home/Home";
import About from "./components/siteInfo/About";
import Contact from "./components/siteInfo/Contact";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
