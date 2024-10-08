"use server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, House, Telescope } from "lucide-react";
import Link from "next/link";
import { parseGlink } from "@/lib/utils";
import { fetchJSON } from "@/lib/actions";
import ImageCard from "@/components/products/imageCard";

export default async function Page({
  params,
}: {
  params: { productName: string };
}) {
  const res = await fetchJSON()
  const rename = params.productName.toLowerCase().replaceAll(" ", "-");
  const catData = (res as any)?.[rename];
  const subCats = catData ? Object.keys(catData).filter(el => el != "sideImage") : [];

  return (
    <>
      <div className="px-5 w-screen overflow-hidden">
        <div className="flex justify-between md:justify-end items-center py-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:fixed top-3 left-5">
            {params.productName.toLocaleUpperCase()}
          </h1>
          <Link href="/">
            <House className="" />
          </Link>
        </div>
        {/* mobile */}
        <Image
          src={parseGlink(catData?.sideImage)}
          alt={"slide"}
          width={250}
          height={250}
          className="object-cover w-full scale-125 my-3 h-36 top-[53%] md:hidden"
        />
        {/* desktop */}
        <Image
          src={parseGlink(catData?.sideImage)}
          alt={"slide"}
          width={700}
          height={500}
          className="object-cover hidden md:block w-[45vw] h-[67vh] fixed top-[53%] -translate-y-1/2 rounded-2xl"
        />
        <div className="w-full flex justify-end">
          <Accordion
            type="single"
            collapsible
            className="w-full md:w-1/2"
          >
            {subCats.map((subCat) => (
              <AccordionItem value={subCat} key={subCat}>
                <AccordionTrigger className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight">
                  {subCat}
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Dialog>
                    <DialogTrigger>
                      <Telescope className="w-4 h-4 inline mr-2" />
                      View Specifications
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{subCat} Specifications</DialogTitle>
                        <DialogDescription className="text-left">
                          <h4 className="scroll-m-20 text-xl text-gray-700 font-semibold tracking-tight">
                            {catData[subCat]?.tagline}
                          </h4>
                          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            {catData[subCat]?.points?.map(
                              (point: string, id: number) => {
                                const shift = point[0] === "$";
                                if (shift)
                                  point = point.substr(1, point.length);

                                // make bold
                                point = point.replace(
                                  /\*(.*?)\*/g,
                                  "<b>$1</b>",
                                );
                                return (
                                  <li
                                    key={id}
                                    className={`${shift && "ml-5"}`}
                                    style={{
                                      listStyleType: shift ? "square" : "disc",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: point }}
                                  />
                                );
                              },
                            )}
                          </ul>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  {catData[subCat]?.pics?.map((pic: { name: string, link: string }) =>
                    <ImageCard pic={pic} key={pic.name} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
