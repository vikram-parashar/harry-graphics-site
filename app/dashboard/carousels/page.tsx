import EditCarousels from "@/components/dashboard/carousels/edit-carousels";
import { getCarousels, getCategories } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const categories = await getCategories();
  const carousels = await getCarousels();

  return <EditCarousels carousels={carousels} categories={categories} />
}
