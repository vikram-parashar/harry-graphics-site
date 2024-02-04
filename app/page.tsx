import Navbar from "./common/Navbar";
import FeatureSection from "./FeatureSection";
import PromoSection from "./PromoSection";
import Footer from "./common/Footer";
import Hero from "./Hero";
import Services from "./Services";
import Info from "./Info";

export default function Home() {
  return (
    <div className="bg-oceanLight">
      <Navbar />
      <Hero />
      <Services/>
      <PromoSection />
      <FeatureSection />
      <Info />
      <Footer />
    </div>
  );
}
