import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { useCallback, useEffect,useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimension";
import data from "@/public/carousel.json";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  dragFree: true,
  containScroll: "trimSnaps",
};


export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [currentId, setCurrentId] = useState(0);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    setCurrentId((prev) => (prev + 1) % data.urls.length);
  }, [emblaApi]);
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
    <div className="overflow-hidden">
      <div ref={emblaRef}>
        <div className="flex">
          {data.urls.map((imgSrc, index) => (
            <CarouselSlide key={index} imgSrc={imgSrc} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
      {data.urls.map((_, index) => (
      <button
        key={index}
        onClick={() => scrollToSlide(index)}
        className={`w-3 h-3 mx-2 rounded-full border-2 border-rosePine-iris ${index === currentId ? "bg-rosePine-iris" : ""}`}
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
  const {width} =useWindowDimensions();
  return (
    <div
      style={{
        flex: width>768?"0 0 30%" : "0 0 100%",
        minWidth: "0",
        marginRight: "1.5rem",
      }}
    >
      <Image
        src={imgSrc}
        className="object-cover h-[34vh]"
        alt=""
        width={700}
        height={600}
      />
    </div>
  );
};
