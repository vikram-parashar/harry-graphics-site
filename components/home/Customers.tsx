'use client'

import Image from "next/image";

export default function OurCustomers({ customers }: { customers: string[] }) {
  return (
    <div className="bg-rosePineDawn-base pt-10">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center px-5">
        Our Customers
      </h2>
      <div
        className="flex h-32 mt-10 gap-5"
        id="scroll-animate"
      >
        {customers.map((img, index) =>
          <Image
            key={index}
            src={img}
            width={200}
            height={100}
            alt="Partners"
            className="w-auto h-auto object-contain item"
            style={{
              animationDelay: `${30 / customers.length * (customers.length - index + 1) * -1}s`,
            }}
          />
        )}
      </div>
    </div>
  );
}
