'use client'

import { CustomerType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function OurCustomers({ customers }: { customers: CustomerType[] }) {
  return (
    <div className="bg-rosePineDawn-base pt-5">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center px-5">
        Our Customers
      </h2>
      <div
        className="flex h-32 mt-10 "
        id="scroll-animate"
      >
        {customers.map((item, index) =>
          <Link
            key={index}
            href={item.web_link}
            passHref={true}
            target="_blank"
            className=""
            >
            <Image
              src={item.image}
              width={200}
              height={100}
              alt="Partners"
              className="w-auto h-auto object-contain item px-5"
              style={{
                animationDelay: `${30 / customers.length * (customers.length - index + 1) * -1}s`,
              }}
            />
          </Link>
        )}
      </div>
    </div>
  );
}
