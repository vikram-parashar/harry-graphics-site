'use client'
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  dragFree: true,
  containScroll: "trimSnaps",
};


export default function Carousel({ carousels }: {
  carousels: { image: string, category_id: string }[]
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [currentId, setCurrentId] = useState(0);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    setCurrentId((prev) => (prev + 1) % carousels?.length);
  }, [emblaApi, carousels]);
  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
    setCurrentId(index);
  }, [emblaApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="overflow-hidden ">
      <div ref={emblaRef} className="h-56 md:h-[33vh] overflow-hidden">
        <div className="flex h-full">
          {carousels?.map((item, index) => (
            <CarouselSlide key={index} imgSrc={item.image} extLink={`/product/${item.category_id}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        {carousels?.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`w-4 h-4 mx-2 rounded-full border-2 border-rosePine-iris ${index === currentId ? "bg-rosePine-iris" : ""}`}
          >
          </button>
        ))}
      </div>
    </div>
  );
}

const CarouselSlide = ({ imgSrc, extLink }: { imgSrc: string, extLink: string }) => {
  const [loading, setLoading] = useState(true)
  return (
    <div
      style={{ minWidth: "0", marginRight: "1.5rem", }}
      className="flex-100 md:flex-47" >
      <Link
        href={extLink}
        target="_blank"
        className="w-full block" >
        {loading && <Skeleton className="w-full h-full bg-gray-800" /> }
        <Image
          onLoad={() => setLoading(false)}
          src={(imgSrc)}
          className={loading ? "opacity-0 absolute" : "object-cover w-full"}
          alt=""
          width={500}
          height={350} />
        <ExternalLink className="absolute bottom-3 right-3 mix-blend-difference stroke-white" />
      </Link>
    </div>
  );
};
