'use client'
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimension";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { parseGlink } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  dragFree: true,
  containScroll: "trimSnaps",
};


export default function Carousel({ carouselLinks }: { carouselLinks: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [currentId, setCurrentId] = useState(0);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    setCurrentId((prev) => (prev + 1) % carouselLinks?.length);
  }, [emblaApi, carouselLinks]);
  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
    setCurrentId(index);
  }, [emblaApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollNext();
    }, 3000);


    return () => clearInterval(interval);
  });

  return (
    <div className="overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex">
          {carouselLinks?.map((link, index) => (
            <CarouselSlide key={index} imgSrc={link} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        {carouselLinks?.map((_, index) => (
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

type CarouselSlideProps = {
  imgSrc: string;
};
const CarouselSlide = ({ imgSrc }: CarouselSlideProps) => {
  const [loading, setLoading] = useState(true)
  return (
    <div
      style={{
        minWidth: "0",
        marginRight: "1.5rem",
        position: "relative"
      }}
      className="flex-100 md:flex-30"
    >
      <Link
        href={parseGlink(imgSrc)}
        target="_blank"
      >
        {loading &&
          <Skeleton className="w-full h-48 md:h-[34vh] bg-gray-800" />
        }
        <Image
          onLoad={() => setLoading(false)}
          src={parseGlink(imgSrc)}
          className={loading ? "opacity-0 absolute" : "object-cover h-56 md:h-[34vh]"}
          alt=""
          width={700}
          height={600}
        />
        <ExternalLink className="absolute bottom-3 right-3 mix-blend-difference stroke-white" />
      </Link>
    </div>
  );
};
