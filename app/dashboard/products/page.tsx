import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoryType, ProductType } from "@/lib/types";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient(cookies());

  /**** get categories ****/
  const categoriesRes = await supabase.from('categories').select().order('updated_at', { ascending: false });;
  if (categoriesRes.error || !categoriesRes.data) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Categories data</div>
  }
  const categories: CategoryType[] = categoriesRes.data;

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
