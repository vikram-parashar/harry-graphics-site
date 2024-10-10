"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { House, Telescope } from "lucide-react";
import Link from "next/link";
import ImageCard from "@/components/products/imageCard";
import SideImage from "@/components/products/sideImage";
import axios from "axios";

export default function Page({ params, }: {
  params: { productName: string };
}) {
  const [data, setData] = useState<any>({})
  const [pageLoading, setPageLoading] = useState(true)

  const fetchJSON = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_JSON_URL || "", {
        headers: {
          'X-SILO-KEY': process.env.NEXT_PUBLIC_JSON_API,
          'Content-Type': 'application/json'
        }
      });
      setData(response.data)
      setPageLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setPageLoading(false)
    }
  }

  useEffect(() => { fetchJSON() }, [])
  const rename = params.productName.toLowerCase().replaceAll(" ", "-");
  const catData = (data as any)?.[rename];
  const subCats = catData ? Object.keys(catData).filter(el => el != "sideImage") : [];

  return (
    <>
      {pageLoading ?
        <div className="h-screen w-screen bg-rosePine-base flex justify-center items-center">
          <span className="font-black uppercase text-5xl text-center leading-[4rem] text-rosePine-love">Harry graphics</span>
        </div> :
        <div className="px-5 w-screen overflow-hidden">
          <div className="flex justify-between md:justify-end items-center py-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:fixed top-3 left-5">
              {params.productName.toLocaleUpperCase()}
            </h1>
            <Link href="/">
              <House className="" />
            </Link>
          </div>
          <SideImage link={catData?.sideImage} />
          <div className="w-full flex justify-end">
            <Accordion
              type="single"
              collapsible
              className="w-full md:w-1/2"
              defaultValue={"0"}
            >
              {subCats.map((subCat, id) => {
                return (
                  <AccordionItem value={id.toString()} key={id}>
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
                )
              })}
            </Accordion>
          </div>
        </div>
      }
    </>
  );
}
