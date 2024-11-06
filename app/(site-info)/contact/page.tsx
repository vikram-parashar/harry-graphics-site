'use client'
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ContactForm from "./ContactForm";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/socialIcons";
import { Home, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [loading, setLoading] = useState(true)
  return (
    <div className="">
      {/* tablet / mobile view */}
      <div className="mx-auto mb-5 max-w-md px-5 lg:hidden">
        {/* Contact icon */}
        <PhoneCall className="mt-10 h-16 w-16 fill-rosePine-subtle" />
        {/* Heading */}
        <h1 className="my-8 text-4xl font-medium">Contact Us</h1>
        {/* Contact */}
        <div className="mb-5">
          <h3 className="font-bold">CONTACTS</h3>
          <p >harrygraphics21@gmail.com</p>
          <p >+91 9891554224</p>
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
        {loading &&
          <Skeleton className="w-full h-[40vh] bg-gray-800" />
        }
        <iframe
          onLoad={() => setLoading(false)}
          className={loading ? "opacity-0 absolute" : "h-[40vh] w-full"}
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
            <h1 className="text-8xl tracking-tighter">
              CONTACT US
            </h1>
            <div>
              {/* seprator */}
              <div className="bg-rosePine-base mb-5 h-3 w-24 justify-around"></div>
              {/* contact and address */}
              <div className="flex gap-5">
                <div className="flex-2">
                  <h3 className="font-bold">CONTACTS</h3>
                  <p>harrygraphics21@gmail.com</p>
                  <p>+91 9891554224</p>
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
          {loading &&
            <Skeleton className="w-[40rem] h-[40rem] bg-gray-800" />
          }
          <iframe
            onLoad={() => setLoading(false)}
            className={loading ? "opacity-0 absolute" : "h-[40rem] w-[40rem]"}
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
