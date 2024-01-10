"use client";

import Image from "next/image";
import ContactForm from "./ContactForm";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function Contact() {
  return (
    <div className="bg-oceanLight">
      <Navbar />
      {/* tablet / mobile view */}
      <div className="mx-auto mb-16 max-w-md px-5 lg:hidden">
        {/* Contact icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#17252A"
          className="mt-10 h-16 w-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
        {/* Heading */}
        <h1 className="my-8 text-4xl text-oceanDark">Contact Us</h1>
        {/* Contact */}
        <div className="mb-5">
          <h3 className="font-bold text-oceanDark">CONTACTS</h3>
          <p className="mb-1 text-oceanDark">123-456-7890</p>
          <p className="text-oceanDark">harrygraphics21@gmail.com</p>
          <p className="text-oceanDark">harrygraphics21@gmail.com</p>
        </div>
        {/* Address */}
        <div className="mb-5">
          <h3 className="font-bold text-oceanDark">ADDRESS</h3>
          <p className="text-oceanDark">123 your street name,</p>
          <p className="text-oceanDark">City name, Country, post code </p>
        </div>
        {/* social icons */}
        <div className="mb-8 flex">
          <svg className="mr-8 h-6 w-6" viewBox="0 0 20 20">
            <path
              fill="#2B7A78"
              d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"
            ></path>
          </svg>
          <svg className="mr-8 h-6 w-6" viewBox="0 0 20 20">
            <path
              fill="#2B7A78"
              d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
            ></path>
          </svg>
          <svg className="mr-8 h-7 w-7" viewBox="0 0 20 20">
            <path
              fill="#2B7A78"
              d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"
            ></path>
          </svg>
        </div>
        {/* seprator */}
        <div className="mb-3 h-[6px] w-12 bg-oceanWarm"></div>
        {/* Image */}
        <Image
          width={324}
          height={566}
          className=""
          src="/contactus.avif"
          alt="main"
        />
      </div>

      {/* Desktop view */}
      <div className="relative mx-auto mt-24 hidden max-w-[1280px] px-5 lg:block">
        {/* floating side */}
        <div className="absolute top-12 flex w-full justify-between">
          <h1 className=" bg-gradient-to-b from-slate-600 to-slate-950 bg-clip-text text-8xl tracking-tighter text-transparent">
            CONTACT US
          </h1>
          <span></span>
        </div>

        <div className="flex">
          {/* Left side */}
          <div className="flex w-[50%] flex-col justify-end">
            {/* seprator */}
            <div className="clr-invert  mb-10 h-4 w-24"></div>
            {/* contact and address */}
            <div className="flex w-full">
              <div className="w-1/2">
                <h3 className="font-bold text-oceanDark">CONTACTS</h3>
                <p className="mb-1 text-oceanDark">123-456-7890</p>
                <p className="text-oceanDark">harrygraphics21@gmail.com</p>
              </div>
              <div className="w-1/2">
                <h3 className="font-bold text-oceanDark">ADDRESS</h3>
                <p className="text-oceanDark">123 your street name,</p>
                <p className="text-oceanDark">City name, Country, post code </p>
              </div>
            </div>
          </div>
          {/* Right side */}
          <Image
            className="pl-24"
            src="/contactus.avif"
            alt="main"
            width={1080}
            height={1920}
          />
        </div>
        {/* social icons */}
        <div className="mb-8 mt-5 flex w-full justify-end pr-12">
          <svg className="mr-8 h-6 w-6" viewBox="0 0 20 20">
            <path
              fill="#3AAFA9"
              d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"
            ></path>
          </svg>
          <svg className="mr-8 h-6 w-6" viewBox="0 0 20 20">
            <path
              fill="#3AAFA9"
              d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
            ></path>
          </svg>
          <svg className="mr-8 h-7 w-7" viewBox="0 0 20 20">
            <path
              fill="#3AAFA9"
              d="M8.937,10.603c-0.383-0.284-0.741-0.706-0.754-0.837c0-0.223,0-0.326,0.526-0.758c0.684-0.56,1.062-1.297,1.062-2.076c0-0.672-0.188-1.273-0.512-1.71h0.286l1.58-1.196h-4.28c-1.717,0-3.222,1.348-3.222,2.885c0,1.587,1.162,2.794,2.726,2.858c-0.024,0.113-0.037,0.225-0.037,0.334c0,0.229,0.052,0.448,0.157,0.659c-1.938,0.013-3.569,1.309-3.569,2.84c0,1.375,1.571,2.373,3.735,2.373c2.338,0,3.599-1.463,3.599-2.84C10.233,11.99,9.882,11.303,8.937,10.603 M5.443,6.864C5.371,6.291,5.491,5.761,5.766,5.444c0.167-0.192,0.383-0.293,0.623-0.293l0,0h0.028c0.717,0.022,1.405,0.871,1.532,1.89c0.073,0.583-0.052,1.127-0.333,1.451c-0.167,0.192-0.378,0.293-0.64,0.292h0C6.273,8.765,5.571,7.883,5.443,6.864 M6.628,14.786c-1.066,0-1.902-0.687-1.902-1.562c0-0.803,0.978-1.508,2.093-1.508l0,0l0,0h0.029c0.241,0.003,0.474,0.04,0.695,0.109l0.221,0.158c0.567,0.405,0.866,0.634,0.956,1.003c0.022,0.097,0.033,0.194,0.033,0.291C8.752,14.278,8.038,14.786,6.628,14.786 M14.85,4.765h-1.493v2.242h-2.249v1.495h2.249v2.233h1.493V8.502h2.252V7.007H14.85V4.765z"
            ></path>
          </svg>
        </div>
      </div>
      <ContactForm />
      <div className="px-5 pb-3 pt-10">
        <p className="text-xl text-oceanDark">Reach us</p>
        <h1 className="mb-5 font-bold text-oceanWarm">Harry Graphics Office</h1>
        <iframe
          className="relative -left-5 h-[300px] w-screen md:h-[500px] lg:h-[600px] xl:h-[700px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.174054888763!2d77.31444587664623!3d28.323333875835036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbba71a4f7bb%3A0x99d2598fe9269101!2sHarry%20Graphics%2C%20ID%20Card%20Manufacturers%20and%20Printers!5e0!3m2!1sen!2sin!4v1698336947246!5m2!1sen!2sin"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}
