'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExpandIcon, LogOut, MoveDownRight, Package, ShoppingCart } from 'lucide-react';
import { createClient } from '@/supabase/utils/client';
import { logout } from '@/lib/actions/auth';
import { toast } from 'sonner';
import { RelationTypes } from '@/lib/types';
import { usePathname } from 'next/navigation';

function Navbar({ categories }: {
  categories: RelationTypes['Category'][]
}) {
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setProductsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className='h-[120px] w-[208px] lg:w-[346px] lg:h-[200px] absolute top-5 left-5 lg:top-10 lg:left-20 z-10'>
        <Image
          src="/logo2.png"
          alt="logo"
          fill />
      </div>
      <div className='flex lg:hidden'>
        <MobileNav />
      </div>
      <div className={cn('absolute top-12 right-0 hidden z-20 lg:block uppercase bg-secondary-background p-3 border-5 border-main-foreground',
        ' text-nowrap text-2xl text-main-foreground font-bold w-[900px] shadow-[5px_5px_0_black]',
        productsOpen ? 'h-auto' : 'h-16'
      )}>
        <ul className='flex'>
          <li className='border-r-3 px-5 border-main-foreground'>
            <Link href="/about"> About </Link>
          </li>
          <li className='border-r-3 pl-5 pr-3 border-main-foreground'>
            <button onClick={() => setProductsOpen(curr => !curr)} >
              Products <MoveDownRight className={cn('inline transition-transform', productsOpen && '-rotate-90')} />
            </button>
          </li>
          <li className='border-r-3 px-5 border-main-foreground'>
            <Link href="/about"> Contact Us </Link>
          </li>
          <li className='px-5'>
            <Link href="/about"> Get a quote </Link>
          </li>
          <div className='bg-main rounded-full w-[100px] h-[100px] absolute right-16 -top-6 border-4 border-main-foreground shadow-[0_5px_0_black]'>
            <UserBtn />
          </div>
        </ul>
        <div className={cn('p-5 grid-cols-2 mr-20', productsOpen ? 'grid' : 'hidden')}>
          {categories.map((category, index) => <p key={index} className='text-2xl font-semibold text-main-foreground'>
            <Link href={`/explore/category/${category.id}`}>{category.name}</Link>
          </p>)}
        </div>
      </div>
    </>
  )
}


const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  return (
    <>
      <div className={cn('absolute top-0 left-0 w-screen h-screen z-20', open ? 'bg-overlay' : 'hidden')}>
        <div className='h-[120px] w-[208px] relative m-5'>
          <Image
            src="/logo3.png"
            alt="logo"
            fill />
        </div>
        <div className='bg-main rounded-full w-[70px] h-[70px] absolute right-5 top-3 border-4 border-main-foreground'>
          <button onClick={() => setOpen(curr => !curr)}>
            <Image
              src="/shut-down.png"
              alt="shutdown"
              className='scale-[0.6]'
              fill
            />
          </button>
        </div>
        <ul className='text-black pl-10 text-4xl font-semibold flex flex-col gap-3 mt-20'>
          <li>
            <Link href="/about"> About </Link>
          </li>
          <li>
            <button onClick={() => setProductsOpen(curr => !curr)} >
              Products <MoveDownRight className={cn('inline transition-transform', productsOpen && '-rotate-90')} />
            </button>
            <div className={cn('p-5 mr-20 max-h-[40vh] text-3xl overflow-y-scroll', productsOpen ? 'block' : 'hidden')}>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
              <p>dfjalk</p>
            </div>
          </li>
          <li>
            <Link href="/about"> Contact Us </Link>
          </li>
          <li>
            <Link href="/about"> Get a quote </Link>
          </li>
        </ul>
      </div>
      <div className='bg-main rounded-full w-[70px] h-[70px] absolute right-5 top-3 border-4 border-main-foreground'>
        <button onClick={() => setOpen(curr => !curr)}>
          <Image
            src="/hamburger.png"
            alt="menu"
            className='scale-[0.6]'
            fill
          />
        </button>
      </div>
      <div className='bg-main rounded-full w-[70px] h-[70px] absolute right-24 top-3 border-4 border-main-foreground'>
        <UserBtn />
      </div>
    </>
  )
}

const UserBtn = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const getUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching user:', error);
      return;
    }
    const currentUser = data.session?.user.user_metadata.name || null;
    if (!currentUser) {
      return;
    }
    const Initial_1 = currentUser[0].toUpperCase() || '';
    const Initial_2 = currentUser.split(' ')[1]?.[0]?.toUpperCase() || '';
    setUsername(`${Initial_1}${Initial_2}`);
  }

  useEffect(() => { getUser(); }, []);
  return (
    <>
      {username ?
        <button
          onClick={() => setMenuOpen(curr => !curr)}
          className='text-4xl w-full h-full lg:text-6xl cursor-pointer' >
          {username}
        </button> :
        <Link href="/auth/login">
          <Image
            src="/user.png"
            alt="user"
            fill
          />
        </Link>
      }
      {username && menuOpen && <UserMenu />}
    </>
  )
}

const UserMenu = () => {
  return (
    <>
      <div className={cn('z-20 bg-secondary-background border-5 border-main-foreground flex scale-90',
        'h-16 shadow-[5px_5px_0_black] absolute -right-30 -bottom-[90px]',
      )}>
        <div className='bg-main rounded-full w-[100px] h-[100px] border-4 border-main-foreground flex justify-center shadow-[0_5px_0_black] items-center relative -top-5 mx-5 cursor-pointer'>
          <Link href="/user/cart" ><ShoppingCart className='text-main-foreground' size={40} /></Link>
        </div>
        <div className='bg-main rounded-full w-[100px] h-[100px] border-4 border-main-foreground flex justify-center shadow-[0_5px_0_black] items-center relative -top-5 mx-5 cursor-pointer'>
          <Link href="user/orders" ><Package className='text-main-foreground' size={40} /></Link>
        </div>
        <div className='bg-main rounded-full w-[100px] h-[100px] border-4 border-main-foreground flex justify-center items-center relative shadow-[0_5px_0_black] -top-5 ml-5 mr-10 cursor-pointer'>
          <button
            onClick={async () => {
              const res = await logout();
              if (!res.success) {
                toast.error(res.msg);
              }
            }}
          ><LogOut className='text-main-foreground' size={40} /></button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
