import SideImage from "@/components/products/sideImage";
import ProductItem from "@/components/products/product-item";
import { getCategoryById, getProductsByCategory } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page({ params, }: {
  params: { catID: string };
}) {
  const category=await getCategoryById(params.catID);
  const products=await getProductsByCategory(params.catID);

  return (
    <div className="px-5 w-screen overflow-hidden md:pt-12">
      <div className="flex items-center py-5 pr-24 md:pr-0">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {category.name}
        </h1>
      </div>
      <div className="hidden md:block">
        <SideImage link={category.header_image} />
      </div>
      <div className="md:hidden">
        <SideImage link={category.header_image_mobile} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-10">
        {products.map((item, index) =>
          <ProductItem item={item} key={index} />
        )}
      </div>
    </div>
  );
}
