import data from "@/public/products.json";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  return (
    <div className="min-h-screen bg-rosePineDawn-base px-5 md:px-10 py-10">
      <div className="flex flex-col md:flex-row text-[25vw] justify-between leading-[5rem] md:text-[10vw] font-black mb-10 md:mb-20 md:mt-10">
        <span>SHOP</span>
        <span>NOW</span>
      </div>
      {data.categories.map((category) => (
        <div
          key={category.name}
          className="flex flex-col md:flex-row gap-3 mb-5"
        >
          {category.products.map((product, index) => {
            if (index < category.nameAtId && index < 3)
              return <ProductCard product={product} key={product.name} />;
          })}
          <CategoryCard name={category.name} desc={category.desc} />
          {category.products.map((product, index) => {
            if (index >= category.nameAtId && index < 3)
              return <ProductCard product={product} key={product.name} />;
          })}
        </div>
      ))}
    </div>
  );
}

const ProductCard = ({ product }: any) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const getRandomId = Math.floor(Math.random() * colors.length);
  const ColorBg = colors[getRandomId];
  const ColorBtn = colors[(getRandomId + 1) % colors.length];

  return (
    <div
      className="flex-1  bg-opacity-50 h-[30rem] group relative overflow-hidden"
      style={{ backgroundColor: ColorBg }}
    >
      <Image
        src="/productSample2.png"
        className="object-cover h-[30rem] mx-auto drop-shadow-2xl"
        alt={product.name}
        width={300}
        height={300}
      />
      <span className="absolute top-0 left-0 p-3 font-bold text-xl text-rosePine-highlightLow md:-translate-y-10 transition group-hover:translate-y-0 opacity-70">
        {product.name}
      </span>
      <span className="w-full absolute bottom-0 left-0 p-3 text-sm text-rosePine-highlightLow md:translate-y-20 transition group-hover:translate-y-0 flex justify-between items-center">
        <span>
          &#8377; {product.price}/{product.per} {product.id}
        </span>
        <Link
          href={`/product/${product.id}`}
          className="product-btn text-rosePine-black"
          style={{
            backgroundColor: ColorBtn,
          }}
        >
          View Product
        </Link>
      </span>
    </div>
  );
};
const CategoryCard = ({ name, desc }: { name: string; desc: string }) => {
  return (
    <div className="flex-1 bg-opacity-50 h-[30rem] hidden uppercase md:flex flex-col justify-between">
      <div>
        <Link href={`/category/${name}`} className="underline text-sm flex">
          View All {name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="#000"
            className="h-5 w-5"
          >
            <polygon points="15.36 12.15 15.36 14.15 34.44 14.15 14.16 34.43 14.16 34.43 12.15 36.44 12.15 36.44 12.15 36.44 13.57 37.85 13.57 37.85 13.57 37.85 15.58 35.84 15.58 35.84 35.84 15.57 35.84 34.64 37.84 34.64 37.84 12.15 15.36 12.15"></polygon>
          </svg>
        </Link>
        <div className="font-black text-4xl">{name}</div>
      </div>
      <p className="leading-4 normal-case text-sm">{desc}</p>
    </div>
  );
};
