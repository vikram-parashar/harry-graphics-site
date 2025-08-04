"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import OurCustomers from "@/components/home/Customers";
import Canvas from "@/components/home/Canvas";
import { getCategories, getCustomers } from "@/lib/queries";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"


// export const revalidate = 3600;
export default function Home() {
  // const categories = await getCategories();
  // const customers = await getCustomers();

  return (
    <div>
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>

      {/*
      <Canvas />
      <Hero />
      <Categories categories={categories} />
      <OurCustomers customers={customers} />
      <Footer />
      */}
    </div >
  );
}
