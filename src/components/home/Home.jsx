import FeatureSection from "./FeatureSection";
import LogoCloud from "./LogoCloud";
import ProductGrid from "./ProductGrid";
import PromoSection from "./PromoSection";
import Slideshow from "./Slideshow";

export default function Home() {
  return (
    <div className="bg-oceanLight">
      <Slideshow />
      <PromoSection />
      <FeatureSection />
      <LogoCloud />
      <ProductGrid />
    </div>
  );
}
