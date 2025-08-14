'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Hamburger, MoveDownRight } from 'lucide-react';

function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
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
      <div className={cn('absolute top-12 right-0 hidden lg:block uppercase bg-secondary-background p-3 border-5 border-main-foreground',
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
          <div className='bg-main rounded-full w-[100px] h-[100px] absolute right-16 -top-6 border-4 border-main-foreground'>
            <UserBtn />
          </div>
        </ul>
        <div className='absolute rounded-full w-[105px] h-[105px] -z-10 right-16 -top-6 bg-black'> </div>
        <div className={cn('p-5 grid-cols-2 mr-20', productsOpen ? 'grid' : 'hidden')}>
          <p>dfjalk</p>
          <p>dfjalk</p>
          <p>dfjalk</p>
          <p>dfjalk</p>
          <p>dfjalk</p>
          <p>dfjalk</p>
          <p>dfjalk</p>
        </div>
      </div>
    </>
  )
}


const MobileNav = () => {
  const [open, setOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(true);
  return (
    <>
      <div className={cn('absolute top-0 left-0 w-screen h-screen z-20', open ? 'bg-foreground' : 'hidden')}>
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
      <div className='bg-main rounded-full w-[70px] h-[70px] absolute right-28 top-3 border-4 border-main-foreground'>
        <UserBtn />
      </div>
    </>
  )
}

const UserBtn = () => {
  return (
    <Image
      src="/user.png"
      alt="user"
      fill
    />
  )
}

export default Navbar;
