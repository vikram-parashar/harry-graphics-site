import { Highlighter } from "@/components/magicui/highlighter";
import { RelationTypes } from "@/lib/types";
import ProductItem from "@/components/category/ProductDialog"
import { createClient } from "@/supabase/utils/client";
import { unstable_cache } from "next/cache";

const getCategoryById = (catID: string) => unstable_cache(async (catID: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('name').eq('id', catID).single();
  if (error) {
    console.error("Error fetching category:", error);
    return { name: 'Unknown Category' };
  }
  console.log(data)
  return data;
}, [`category-${catID}`], { revalidate: 3600 })(catID);

const getProductsByCategory = (catID: string) => unstable_cache(async (catID: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*,categories(name)').eq('category_id', catID).order('updated_at', { ascending: false });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}, [`products-category-${catID}`], { revalidate: 3600 })(catID);

export default async function Page({ params, }: {
  params: Promise<{ catID: string }>;
}) {
  const { catID } = await params;
  const category: RelationTypes['Category'] = await getCategoryById(catID);
  const products: RelationTypes['Product'][] = await getProductsByCategory(catID);

  return (
    <div className="border-5 bg-background py-20 px-5">
      <h1 className="text-5xl my-5 p-2"><Highlighter color="#EEBA58">{category.name}</Highlighter></h1>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-5 md:gap-5 mt-10">
        {products.map((item, index) =>
          <ProductItem item={item} key={index} />
        )}
      </div>
    </div>
  );
}
