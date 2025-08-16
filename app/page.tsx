import Canvas from "@/components/home/Canvas";
import { getCarousels, getCategories, getCustomers } from "@/lib/queries";
import Carousel from "@/components/home/Carousel";
import Navbar from '@/components/Navbar';
import Categories from "@/components/home/Categories";


export default async function Home() {
  // const categories = await getCategories();
  // const customers = await getCustomers();
  const carousels = await getCarousels();

  return (
    <>
      <Canvas />
      <Navbar />
      <div className="mt-24 lg:mt-40 mx-auto lg:w-[90vw]" >
        <Carousel carousels={carousels} />
        {/*
        <Categories categories={[
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '2', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '3', name: 'Category 1 ', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '4', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '5', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        ]} />
        <Hero />
        <OurCustomers customers={customers} />
        <Footer />
      */}
      </div >
    </>
  );
}
