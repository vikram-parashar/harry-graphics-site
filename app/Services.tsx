import Image from "next/image";
import Link from "next/link";

const Services = () => {
  return (
    <div className="py-20 px-5 gap-y-10 md:px-20 gap-x-20 bg-oceanLight container mx-auto grid grid-cols-1 md:grid-cols-3">
      <h2 className="col-span-full text-center text-3xl font-bold text-oceanDark">
        Our Services
      </h2>
      <Card
        link="/services/idcard"
        img="/services/id-card.jpg"
        heading="ID Card Printing"
      >
        <p className="text-sm leading-7 mb-5 text-gray-800">
          We specialize in professional{" "}
          <b>ID card design and printing in Faridabad</b>&nbsp; and all over
          india. With our expertise, we can create <b>customized ID</b>&nbsp;
          cards that perfectly represent your brand, while ensuring high-quality
          printing for a polished and professional finish.
        </p>
      </Card>
      <Card
        link="/services/lanyard"
        img="/services/lanyard.jpg"
        heading="Lanyard Printing"
      >
        <p className="text-sm leading-7 mb-5 text-gray-800">
          At Lanyard Printing Services in chennai, we specialize in{" "}
          <strong>high-quality lanyard design and printing</strong>. Whether you
          need ID card rope printing or ID card tag printing, our expert team
          will ensure your lanyards are professionally crafted to suit your
          needs.
        </p>
      </Card>
      <Card
        link="/services/idcardholder"
        img="/services/holder.jpg"
        heading="ID Card Holders"
      >
        <p className="text-sm mb-5 leading-7 text-gray-800">
          We Sell ID Card Holders, your one-stop shop for{" "}
          <strong>high-quality ID card holders</strong> &amp; pouches. Whether
          you need a durable ID card holder for everyday use or a secure{" "}
          <strong>ID card pouch</strong> for special events, we have the perfect
          solution to protect &amp; display your identification cards.
        </p>
      </Card>
    </div>
  );
};
const Card = ({
  img,
  heading,
  link,
  children,
}: {
  img: string;
  heading: string;
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border-2 border-oceanWarm p-5 rounded-xl">
      <Image
        className="w-full h-44 md:h-60 object-cover rounded-xl"
        src={img}
        alt={heading}
        width={300}
        height={300}
      />
      <h3 className="mt-5 font-bold text-oceanDark">{heading}</h3>
      {children}
      <Link
        className="px-5 py-2 rounded-md bg-oceanWarm text-oceanLight font-semibold"
        href={link}
      >
        Learn More
      </Link>
    </div>
  );
};
export default Services;
