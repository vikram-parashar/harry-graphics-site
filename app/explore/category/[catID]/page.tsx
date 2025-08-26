import { Highlighter } from "@/components/magicui/highlighter";
import { getCategoryById, getProductsByCategory } from "@/lib/queries";
import { RelationTypes } from "@/lib/types";
import ProductItem from "../components/ProductDialog"

export default async function Page({ params, }: {
  params: Promise<{ catID: string }>;
}) {
  const { catID } = await params;
  const category: RelationTypes['Category'] = await getCategoryById(catID);
  const products: RelationTypes['Product'][] = await getProductsByCategory(catID);

  return (
    <div className="border-5 bg-background pt-20 px-5">
      <h1 className="text-5xl my-5 p-2"><Highlighter color="#EEBA58">{category.name}</Highlighter></h1>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-5 md:gap-5 mt-10">
        {products.map((item, index) =>
          <ProductItem item={item} key={index} />
        )}
      </div>
    </div>
  );
}
