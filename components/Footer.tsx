import { FacebookIcon, Mail, TwitterIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-rosePine-base text-rosePine-text px-5 py-16">
      <div className="max-w-6xl lg:mx-auto lg:flex">
        <div className="flex mb-10 lg:w-1/3">
          <p className="text-3xl">HARRY GRAPHICS</p>
        </div>
        {/* Contact */}
        <div className="mb-8 lg:w-1/3">
          <h5 className="font-bold">CONTACTS</h5>
          <p className="mb-2">harrygraphics21@gmail.com</p>
          <p className="mb-2">+91 9891554224</p>
        </div>
        {/* Address */}
        <div className="lg:w-1/3">
          <h5 className="font-bold">ADDRESS</h5>
          <p>Sector 60, Subhash Colony, Ballabgarh</p>
          <p> Faridabad, Faridabad, India, Haryana</p>
        </div>
      </div>

      {/* social icons */}
      <div className="lg:ml-1/3 my-8 flex max-w-6xl pl-2 lg:mx-auto lg:mt-4 lg:pl-14 gap-5">
        <Mail className="fill-rosePine-rose stroke-rosePine-base" strokeWidth={2}/>
        <TwitterIcon className="fill-rosePine-foam stroke-rosePine-subtle" strokeWidth={1}/>
        <FacebookIcon className="fill-rosePine-gold stroke-rosePine-base" strokeWidth={1}/>
      </div>
    </div>
  );
}
