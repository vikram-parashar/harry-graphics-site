import Image from "next/image";

export default function PromoSection() {
  return (
    <div className="relative overflow-hidden bg-oceanDark ">
      <div className="pb-12 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-oceanCool sm:text-6xl">
                ID Card & Lanyard Printing Services
              </h1>
              <p className="mt-4 text-xl text-oceanLight">
                Welcome to Harry Graphics, your trusted destination for
                top-notch ID card design, ID card rope design, and printing
                services in Faridabad,Haryana, India. With a commitment to
                excellence and a passion for delivering superior products, we
                cater to a diverse range of clients, employees, students, and
                members.
              </p>
              <p className="mt-4 text-xl text-oceanLight">
                At Lanyard Printing, we understand that your ID card is not just
                a piece of plastic; it represents your identity, your
                organization, and your professionalism. With this in mind, our
                team of skilled designers and printing experts work diligently
                to create stunning ID card designs that truly reflect your brand
                and purpose.
              </p>
              <p className="mt-4 text-xl text-oceanLight">
                Whether you require a simple yet elegant ID card rope design or
                a sophisticated ID card tag printing solution, we have got you
                covered. Our state-of-the-art printing facilities, combined with
                cutting-edge technology, enable us to produce high-quality
                products that are both visually appealing and durable.
              </p>
              <p className="mt-4 text-xl text-oceanLight">
                What sets us apart from the competition is our unwavering
                commitment to quality. We meticulously select the finest
                materials and employ advanced printing techniques to ensure that
                every ID card, lanyard, and tag we produce meets the highest
                standards. Our attention to detail guarantees that your ID cards
                not only look professional but also withstand the test of time.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
              className="mx-auto my-5 w-full md:w-[80%]"
                src="/id-card-and-lanyard-printing.jpg"
                width={500}
                height={600}
                alt="id-card-and-lanyard-printing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
