import Link from "next/link";
import { getCategories } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="flex flex-wrap gap-5 mt-10">
      {categories.map((item, index) =>
        <Link
          href={`/dashboard/products/${item.id}`}
          key={index}
          className="p-3 rounded-md bg-rosePineDawn-overlay"
        >
          {item.name}
        </Link>
      )}
    </div>
  )
}
