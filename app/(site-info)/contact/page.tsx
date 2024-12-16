import ContactForm from "@/components/forms/contact-us";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/socialIcons";
import { MailPlus, PhoneCall, PhoneOutgoing } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Contact() {
  return (
    <div className="bg-rosePineDawn-base pt-10">
      {/* tablet / mobile view */}
      <div className="mx-auto mb-5 max-w-md px-5 lg:hidden">
        {/* Contact icon */}
        <PhoneCall className="h-16 w-16 fill-rosePine-subtle" />
        {/* Heading */}
        <h1 className="my-8 text-4xl font-medium flex gap-5 items-center">
          Contact Us
          <Button className="rounded-full p-0 bg-rosePineMoon-rose w-12 h-12" asChild>
            <Link href="tel:+919891553224"><PhoneOutgoing size={10} /></Link>
          </Button>
          <Button className="rounded-full p-0 bg-rosePineMoon-rose w-12 h-12" asChild>
            <Link href="mailto:harrygraphics21@gmail.com" target="_blank"><MailPlus size={10} /></Link>
          </Button>
        </h1>
        {/* Contact */}
        <div className="mb-5">
          <h3 className="font-bold">CONTACTS</h3>
          <Link className="block" href="mailto:harrygraphics21@gmail.com" target="_blank">harrygraphics21@gmail.com</Link>
          <Link href="https://wa.me/9891553224?text=Hi,%20I%20came%20from%20your%20website.%20I%20wanna%20know%20about..." target="_blank" className="block">
            +91 9891554224
          </Link>
        </div>
        {/* Address */}
        <div className="mb-5">
          <h3 className="font-bold">ADDRESS</h3>
          <p>
            1324,Street No. 16,Subhash Colony, Faridabad - 121004, Haryana, India
          </p>
        </div>
        {/* social icons */}
        <div className="mb-8 flex gap-5">
          <SocialIcons />
        </div>
        {/* seprator */}
        <div className="mb-3 h-[6px] w-12 bg-rosePine-base"></div>
        {/* map */}
        <iframe
          className={"h-[40vh] w-full"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.174054888763!2d77.31444587664623!3d28.323333875835036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbba71a4f7bb%3A0x99d2598fe9269101!2sHarry%20Graphics%2C%20ID%20Card%20Manufacturers%20and%20Printers!5e0!3m2!1sen!2sin!4v1698336947246!5m2!1sen!2sin"
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Desktop view */}
      <div className="mx-auto mt-24 hidden max-w-[1280px] px-5 lg:block">
        <div className="flex justify-between gap-5 mb-16">
          {/* Left side */}
          <div className="flex flex-col justify-between w-full">
            <h1 className="text-8xl tracking-tighter flex gap-5 items-center">
              CONTACT US
              <Button className="rounded-full p-0 bg-rosePineMoon-rose w-24 h-24 hover:bg-rosePineDawn-love" asChild>
                <Link href="mailto:harrygraphics21@gmail.com" target="_blank"><MailPlus className="scale-150" size={10} /></Link>
              </Button>
            </h1>
            <div>
              {/* seprator */}
              <div className="bg-rosePine-base mb-5 h-3 w-24 justify-around"></div>
              {/* contact and address */}
              <div className="flex gap-5">
                <div className="flex-2">
                  <h3 className="font-bold">CONTACTS</h3>
          <Link className="block" href="mailto:harrygraphics21@gmail.com" target="_blank">harrygraphics21@gmail.com</Link>
          <Link href="https://wa.me/9891553224?text=Hi,%20I%20came%20from%20your%20website.%20I%20wanna%20know%20about..." target="_blank" className="block">
            +91 9891554224
          </Link>
                </div>
                <div className="flex-2">
                  <h3 className="font-bold">ADDRESS</h3>
                  <p>
                    1324,Street No. 16,Subhash Colony,<br />
                    Faridabad - 121004, Haryana, India
                  </p>
                </div>
                {/* social icons */}
                <div className="flex justify-end gap-5 flex-1 items-end pb-2 pr-2">
                  <SocialIcons />
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <iframe
            className={"h-[40rem] w-[40rem]"}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.174054888763!2d77.31444587664623!3d28.323333875835036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbba71a4f7bb%3A0x99d2598fe9269101!2sHarry%20Graphics%2C%20ID%20Card%20Manufacturers%20and%20Printers!5e0!3m2!1sen!2sin!4v1698336947246!5m2!1sen!2sin"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </div >
  );
}
