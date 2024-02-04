import Image from "next/image";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";

const LanyardPage = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl gap-5 md:gap-10 mt-8 md:mt-16 md:mx-auto mx-5 grid grid-cols-1 md:grid-cols-2">
        <Image
          src="/services/lanyardmock.jpg"
          className="rounded-lg"
          alt="lanyardFront"
          width={600}
          height={600}
        />

        <div>
          <h3 className="pb-4 border-b-2 border-b-oceanCool text-oceanDark">
            Superior Lanyard Priinting
          </h3>
          <h1 className="font-semibold">
            Lanyard Printing Services in Faridabad
          </h1>

          <p className="pb-5 text-justify">
            One of the key features of our lanyard printing services is the
            variety of sizes we offer. We understand that different events and
            occasions call for different lanyard widths. That's why we provide
            options in 12mm, 16mm, and 20mm lanyard printing. You can choose the
            size that perfectly suits your requirements and ensures maximum
            comfort for the wearer.
          </p>

          <p className="pb-5 text-justify">
            Our team of skilled professionals is dedicated to delivering
            high-quality lanyards that exceed your expectations. We use
            state-of-the-art printing techniques and premium materials to ensure
            durability and longevity. Rest assured, your lanyards will not only
            look great but also stand the test of time.
          </p>

          <p className="pb-5 text-justify">
            Whether you need lanyards for corporate events, conferences,
            schools, or any other purpose, we are here to make your vision a
            reality. We believe that every client, employee, member, and student
            deserves a lanyard that represents their identity and leaves a
            lasting impression.
          </p>

          <p className="pb-5 text-justify">
            So, why wait? Get in touch with Harry Graphics today and let us take
            care of all your lanyard printing needs. Our friendly team is always
            ready to assist you and provide personalized solutions that suit
            your specific requirements. Experience the best lanyard printing
            services in Faridabad with Harry Graphics.
          </p>

          <p className="pb-5 text-justify">
            Contact us today to discuss your requirements and let us help you
            create personalized, professional ID cards that leave a lasting
            impression.
          </p>
        </div>
        <div>
          <h1 className="font-semibold">Why Lanyard Printing Important?</h1>
          <Image
            src="/services/lanyardmock2.jpg"
            className="rounded-lg mx-auto mb-8"
            alt="lanyardFront"
            width={600}
            height={600}
          />
          <p className="pb-5 text-justify">
            In today's competitive world, establishing a strong brand identity
            is crucial for any business or organization. One effective way to
            achieve this is through customized lanyards. Lanyards not only serve
            as a functional accessory but also act as a powerful marketing tool.
            At our printing facility in Chennai, we specialize in providing
            top-notch lanyard printing services to cater to the needs of various
            businesses and organizations in the Pallavaram, Alandur, Saidapet,
            Adyar, Velachery, Pallikaranai, Medavakkam, Madipakkam, Adambakkam,
            and Chrompet areas.
          </p>
        </div>
        <div>
          <h1 className="font-semibold">
            ID Card Rope Design and Printing
          </h1>
          <Image
            src="/services/lanyardmock3.jpg"
            className="rounded-lg mx-auto mb-8"
            alt="lanyardFront"
            width={600}
            height={600}
          />
          <p className="pb-5 text-justify">
            Lanyard printing is a process that involves creating personalized
            lanyards with custom designs, logos, or text. These lanyards can be
            used for a wide range of purposes, including employee
            identification, event passes, trade shows, conferences, and
            promotional giveaways. By incorporating your brand's logo or message
            onto the lanyards, you can effectively enhance your brand visibility
            and create a lasting impression on your target audience.
          </p>
        </div>
        <div>
          <h1 className="font-semibold">Lanyard Printing Services</h1>
          <p className="pb-5 text-justify">
            <b>1. ID card rope printing :</b> One of the key services we offer
            is ID card rope printing. ID card ropes are an essential component
            of any identification system, ensuring that ID cards are securely
            attached to the lanyards. Our printing experts utilize
            state-of-the-art technology and high-quality materials to produce
            durable and visually appealing ID card ropes. Whether you require a
            specific color, pattern, or design, we can accommodate your unique
            requirements to create ID card ropes that reflect your brand's
            identity.
          </p>
          <p className="pb-5 text-justify">
            <b>2. ID card tag printing : </b> In addition to ID card rope
            printing, we also specialize in ID card tag printing. ID card tags
            are an integral part of any lanyard-based identification system.
            They provide a platform to display important information such as
            employee names, job titles, and company logos. Our printing facility
            is equipped with advanced printing machinery, allowing us to produce
            high-resolution ID card tags with precision and clarity. We offer a
            wide range of customization options, including various shapes,
            sizes, colors, and finishes, ensuring that your ID card tags
            perfectly align with your brand's aesthetics.
          </p>
          <p className="pb-5 text-justify">
            <b>3. Our Faridabad printing facility :</b> At our Faridabad printing
            facility, we prioritize quality and customer satisfaction above all
            else. We understand that each business or organization has its
            unique requirements, and we strive to deliver tailor-made solutions
            that meet those needs. Our team of experienced designers and
            technicians work closely with our clients to ensure that every
            lanyard, ID card rope, and ID card tag accurately represents their
            brand identity.
          </p>
        </div>
        <Image
          src="/services/lanyardmock4.jpg"
          className="rounded-lg"
          alt="lanyardFront"
          width={500}
          height={500}
        />
      </div>
      <div className="my-20 bg-oceanDark text-oceanLight py-10">
        <div className="mx-5 md:mx-auto max-w-7xl">
          <h1 className="font-semibold border-b-2 text-oceanCool pb-5 border-b-oceanCool">
            Best Quality Of Harry Graphics ID Card Printing in Faridabad - Call
            or Whatsapp : +91 9891553224
          </h1>
          Harry Graphics is a premier printing company in Faridabad, offering a
          wide range of printing solutions with a focus on quality, their team
          ensures that every print job is executed with precision and
          professionalism.
        </div>
      </div>
      <Footer />
    </>
  );
};
export default LanyardPage;
