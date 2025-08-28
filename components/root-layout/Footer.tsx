import { Contact, ExternalLink, MapPinHouse } from "lucide-react";
import SocialIcons from "./SocialIcons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-main text-background px-5 pt-16 lg:text-2xl border-t-5 border-b-5">
      <div className="lg:mx-auto lg:flex gap-10 lg:w-[90%]">
        <div className="flex mb-10 lg:w-1/3 flex-col">
          <Link href="/" className='w-[187px] lg:w-[350px] h-[60px] lg:h-[112px] bg-background rounded-xl relative mx-auto'>
            <Image
              src="/logo/nobg.png"
              alt="logo"
              fill />
          </Link>
          {/* social icons */}
          <div className="lg:ml-1/3 my-8 flex max-w-6xl lg:mt-4 gap-5 justify-evenly">
            <SocialIcons />
          </div>
        </div>
        <div className="mb-8 lg:w-1/3">
          {/* Contact */}
          <h5 className="font-bold border-b-2 border-background"><Contact className="inline mr-2 relative -top-1" />CONTACTS</h5>
          <p className="">harrygraphics21@gmail.com</p>
          <p className="mb-10">+91 9891554224</p>
          {/* Address */}
          <h5 className="font-bold border-b-2 border-background"><MapPinHouse className="inline mr-2 relative -top-1" />ADDRESS</h5>
          <p className="leading-7">
            1324, Street No. 16, Subhash Colony, Sector 60, Ballabgarh, Faridabad - 121004, Haryana, India
          </p>
        </div>
        <div className="lg:w-1/3">
          <h5 className="font-bold border-b-2 border-background"><ExternalLink className="inline mr-2 relative -top-1" />Links</h5>
          <Link href="/return-policy" className="hover:underline">Return Policy</Link><br />
        </div>
      </div>
      <p className="text-center mt-5" >Copyright © {(new Date()).getFullYear()} Harry Graphics. All rights reserved.</p>
    </div>
  );
}
