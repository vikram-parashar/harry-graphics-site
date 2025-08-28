import { unstable_cache } from "next/cache";
import { createClient } from "@/supabase/utils/client";
import Canvas from "@/components/root-layout/Canvas";
import Navbar from '@/components/root-layout/Navbar';
import Footer from "@/components/root-layout/Footer";
import Link from "next/link";
import Image from "next/image";

const getCategories = () => unstable_cache(async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('id,name').order('updated_at', { ascending: false });
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}, ['categories-nav'], { revalidate: 3600 })();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <div>
      <Canvas />
      <Navbar categories={categories} />
      <div className="mt-24 lg:mt-40 mx-auto lg:w-[90vw] mb-10" >
        {children}
      </div >
      <Link href="https://wa.me/9891553224?text=Hi,%20I%20came%20from%20your%20website.%20I%20wanna%20know%20about..." className="fixed bottom-5 right-5 w-16 h-16 z-50" target="_blank" rel="noopener noreferrer">
        <Image
          fill
          src="/whatsapp-icon.png"
          alt="whatsapp"
        />
      </Link>
      <Footer />
    </div>
  );
}
