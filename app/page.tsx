import Navbar from "./common/Navbar";
import FeatureSection from "./FeatureSection";
import LogoCloud from "./LogoCloud";
import ProductGrid from "./ProductGrid";
import PromoSection from "./PromoSection";
import Slideshow from "./Slideshow";
import Footer from "./common/Footer";

export default function Home() {
  return (
    <div className="bg-oceanLight">
      <Navbar />
      <Slideshow />
      <PromoSection />
      <FeatureSection />
      <LogoCloud />
      <ProductGrid />
      <Footer />
    </div>
  );
}
