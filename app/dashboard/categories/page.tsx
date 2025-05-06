import EditCategories from "@/components/dashboard/categories/edit-categories"
import { getCategories } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const categories=await getCategories();
  return <EditCategories categories={categories}/>
}
