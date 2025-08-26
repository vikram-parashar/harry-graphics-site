'use client'
import Image from "next/image";
import { RelationTypes } from "@/lib/types";
import Link from "next/link";
import { Highlighter } from "@/components/magicui/highlighter";

export default function Categories({ categories }: {
  categories: RelationTypes['Category'][]
}) {
  const headings = ['ID Solutions', 'Lanyard Solutions', 'Merch', 'Awards', 'Others']
  return (
    <>
      <div className="flex bg-[url('/dummy/checkbg.png')] bg-right bg-contain bg-repeat">
        <h1 className="lg:p-5 p-3 text-2xl lg:text-6xl font-bold bg-secondary-background border-l-5 border-r-5">
          Featured Services
        </h1>
      </div>
      <div className="p-5 border-t-5 border-b-5 lg:border-5">
        {headings.map((heading, index) => (
          <div key={index}>
            <h1 className="text-2xl lg:text-5xl my-5 p-2"><Highlighter color="#EEBA58">{heading}</Highlighter></h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 " >
              {categories.filter(category => category.heading === heading).map((category) => (
                <Card key={category.id} category={category} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const Card = ({ category }: {
  category: RelationTypes['Category'],
}) => {

  return (
    <Link
      href={`/explore/category/${category.id}`}
      className="relative ">
      <div className="w-full aspect-square relative border-3 rounded-2xl">
        <Image
          src={category.thumbnail_image || '/notFoundP.jpg'}
          className="object-cover hover:scale-105 hover:rotate-12 transition-transform duration-300"
          alt={category.name || 'Category Image'}
          fill
        />
      </div>
      <div className="text-lg lg:text-2xl font-bold absolute bottom-0 left-0 px-1 lg:p-2 bg-main rounded-bl-xl rounded-tr-2xl border-3">
        {category.name || 'Category Name'}
      </div>
    </Link>
  );
};
