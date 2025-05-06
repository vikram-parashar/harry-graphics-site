import EditProducts from "@/components/dashboard/products/edit-products";
import { getProductsByCategory } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page({ params }: { params: { catId: string } }) {
  const products= await getProductsByCategory(params.catId);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
      {products[0].categories.name}
      </h1>
      <EditProducts products={products} categoryId={params.catId}/>
    </div>
  )
}
