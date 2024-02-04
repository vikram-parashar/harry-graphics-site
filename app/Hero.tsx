"use client";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative">
      <Image
        className="w-screen h-[90vh] md:h-auto object-cover"
        src="/hero-bg.jpg"
        height={540}
        width={960}
        alt="hero-bg"
      />
      <div className="absolute w-full px-5 left-1/2 -translate-x-1/2 max-w-6xl top-10 md:top-44 flex flex-col items-center">
        <p className="text-center text-oceanLight text-lg md:text-2xl">
          Custom Lanyards & ID Cards Printing
        </p>
        <p className="text-center text-3xl my-5 tracking-wide text-oceanLight md:text-5xl font-bold">
          We ensure that your brand stands out with high-quality, personalized
          lanyards and ID cards
        </p>
        <p className="text-center text-oceanLight md:text-xl">
          We offers <b>top-notch lanyard printing</b> and <b>ID card printing services</b>,
          allowing businesses to create personalized and professional
          identification solutions that enhance their brand's image and provide
          a sense of identity and belonging.
        </p>
        <div className="flex gap-5 mt-10">
          <Link
            href="tel:+91 9891553224"
            className="bg-oceanDark text-oceanLight px-5 py-2 rounded-md"
          >
            Click to Call
          </Link>
          <Link
            href="https://api.whatsapp.com/send/?phone=919891553224&text=Hi%2C+I+am_Coming+From+Harry Graphics+Website"
            target="_blank"
            className="bg-oceanDark text-oceanLight px-5 py-2 rounded-md"
          >
            Whatsapp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero
