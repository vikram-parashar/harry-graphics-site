import Image from "next/image";
import Footer from "@/components/Footer";
import { FacebookIcon, Mail, Printer, TwitterIcon } from "lucide-react";

const aboutUs1 = `
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat cupidatat
          ullamco ut ea consectetur et est culpa et culpa duisk.
`
const aboutUs2 = `
          reprehenderit commodo officia dolor Lorem duis laboris cupidatat
          officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex
          in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex
          non excepteur duis sunt velit enim. Voluptate laboris sint
`
export default function About() {
  return (
    <div>
      {/* tablet / mobile view */}
      <div className="mx-auto mb-10 max-w-md px-5 lg:hidden">
        {/* Printer icon */}
        <Printer className="mt-10 h-16 w-16 fill-rosePine-muted" />
        <h1 className="my-8 text-4xl">About Us</h1>
        <p className="mb-2">{aboutUs1} </p>
        <p className="mb-5"> {aboutUs2}</p>
        {/* social icons */}
        <div className="mb-8 flex gap-5">
          <Mail className="fill-rosePine-rose" />
          <TwitterIcon className="fill-rosePine-foam" />
          <FacebookIcon className="fill-rosePine-pine" />
        </div>
        {/* seprator */}
        <div className="mb-3 h-[6px] w-12 bg-rosePine-base"></div>
        <Image
          width={324}
          height={566}
          className=""
          src="/temp.jpg"
          alt="main" />
      </div>

      {/* Desktop view */}
      <div className="relative mx-auto mt-24 hidden max-w-[1280px] px-5 lg:block">
        <div className="flex">
          {/* floating side */}
          <div className="absolute top-12 flex w-full justify-between">
            <span></span>
            <h1 className="mr-28 bg-gradient-to-b from-slate-600 to-slate-950 bg-clip-text text-8xl text-transparent">
              ABOUT US
            </h1>
          </div>
          {/* Left side */}
          <div className="w-1/2">
            <Image
              className="pl-24"
              src="/temp.jpg"
              alt="main"
              width={1920}
              height={1080}
            />
          </div>
          {/* Right side */}
          <div className="mt-56 w-1/2">
            <p className="mb-8 ml-24"> {aboutUs1} </p>
            <p className="mb-5 ml-24"> {aboutUs2} </p>
          </div>
        </div>
        {/* Bottom side */}
        <div className="flex">
          {/* social icons */}
          <div className="mb-8 mt-5 flex w-1/2 justify-end gap-5">
            <Mail className="fill-rosePine-rose" />
            <TwitterIcon className="fill-rosePine-foam" />
            <FacebookIcon className="fill-rosePine-pine" />
          </div>
          {/* seprator */}
          <div className="flex w-1/2 justify-end">
            <div className="mt-5  h-4 w-24 bg-rosePine-base"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
