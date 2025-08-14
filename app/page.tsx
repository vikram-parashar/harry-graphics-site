import Marquee from '@/components/ui/marquee'
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import OurCustomers from "@/components/home/Customers";
import Canvas from "@/components/home/Canvas";
import { getCarousels, getCategories, getCustomers } from "@/lib/queries";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import CompanyLogo from "@/components/companyLogo";
import Carousel from "@/components/home/Carousel";
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


export default async function Home() {
  // const categories = await getCategories();
  // const customers = await getCustomers();
  const carousels = await getCarousels();

  return (
    <>
      <Canvas />
      <Navbar />
      <div className="mt-24 lg:mt-40 mx-auto lg:w-[90vw] lg:border-l-5 lg:border-r-5 border-main-foreground" >
        <Carousel carousels={carousels} />
        {/*
        <Categories categories={[
          { created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '2', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '3', name: 'Category 1 ', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '4', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '5', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        {created_at: '', header_image: null, header_image_mobile: null, id: '1', name: 'Category 1', thumbnail_image: '/auth.jpg', updated_at: '' },
        ]} />
        <Hero />
        <OurCustomers customers={customers} />
        <Footer />
      */}
      </div >
    </>
  );
}
