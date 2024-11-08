'use client'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { CategoryType, UserType } from "@/lib/types";
import { ArrowUpRightIcon, ChevronDown, Home, LogOut, MenuIcon, Package, Search, ShoppingCart, User, User2, X } from "lucide-react";
import Link from "next/link";
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions/auth';

const links = [
  { icon: <Search size={20} />, text: 'Search', link: '/search' },
  { icon: <ArrowUpRightIcon />, text: 'About Us', link: '/about' },
  { icon: <ArrowUpRightIcon />, text: 'Contact Us', link: '/contact' },
]
const userLinks = [
  { icon: <ShoppingCart size={20} />, text: 'Cart', link: '/user/cart' },
]

export default function Menu({ categories, user }: { categories: CategoryType[], user: UserType }) {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const handleClick = () => {
      productsOpen && setTimeout(() => setProductsOpen(false), 200)
      menuOpen && setTimeout(() => setMenuOpen(false), 200)
      userMenuOpen && setTimeout(() => setUserMenuOpen(false), 200)
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  })

  if (path.startsWith('/dashboard') || path.startsWith('/error'))
    return (<></>)

  return (
    <>
      <Button className="z-10 text-rosePine-text bg-rosePine-surface md:hidden fixed top-5 right-5" onClick={() => setMenuOpen(true)}>
        <MenuIcon className='text-rosePine-iris' /> Menu
      </Button>
      <div className={`${menuOpen ? 'flex ' : 'hidden '}
        flex-col md:flex-row justify-between p-5 py-2 my-3 mx-[1.5vw] rounded-md fixed top-0 left-0 bg-rosePine-base h-[95%] w-[97vw] md:h-auto z-10 md:flex`} >
        <Button className="text-rosePine-text fixed top-5 right-5 z-10 bg-rosePine-surface md:hidden" onClick={() => setMenuOpen(false)}>
          <X className='text-rosePine-iris' /> Close
        </Button>
        <ul className="flex gap-5 flex-col md:flex-row">
          <li >
            <Link style={{ color: colors[4], }}
              href="/" className="scroll-m-20 mix-blend-difference text-lg font-semibold tracking-tight flex items-center gap-2">
              Home
              <Home />
            </Link>
          </li>
          <ProductDropDown categories={categories} productsOpen={productsOpen} setProductsOpen={setProductsOpen} />
          {links.map((item, index) =>
            <li key={index}>
              <Link
                style={{ color: colors[index], }}
                href={item.link} className="scroll-m-20 mix-blend-difference text-lg font-semibold tracking-tight flex items-center gap-2">
                {item.text} {item.icon}
              </Link>
            </li>
          )}
        </ul>
        <ul className="flex gap-5 flex-col md:flex-row">
          {userLinks.map((item, index) =>
            <li key={index}>
              <Link
                style={{ color: colors[4 - index], }}
                href={item.link} className="scroll-m-20 mix-blend-difference text-lg font-semibold tracking-tight flex items-center gap-2">
                {item.text} {item.icon}
              </Link>
            </li>
          )}
          <UserDropDown UserMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} user={user} />
        </ul>
      </div>
    </>
  )
}

const ProductDropDown = ({ productsOpen, setProductsOpen, categories }: {
  productsOpen: boolean,
  setProductsOpen: Dispatch<SetStateAction<boolean>>
  categories: CategoryType[]
}) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];

  return (
    <div className="relative">
      <button
        onClick={() => setProductsOpen(prev => !prev)}
        className="scroll-m-20 text-rosePine-foam mix-blend-difference text-lg font-semibold tracking-tight">
        Products
        <ChevronDown className="inline text-rosePine-foam ml-2" />
      </button>
      {productsOpen &&
        <div
          className="text-rosePine-text z-10 bg-rosePine-base mt-5 md:mt-0 max-h-[70vh] overflow-scroll md:absolute transition-opacity text-xl md:w-[300px] top-10 text-center border border-rosePine-subtle rounded-lg"
        >
          {categories.map((cat, index) =>
            <Link
              href={`/product/${cat.id}`}
              className="py-2 block"
              key={index}
              style={{
                color: colors[Math.floor(Math.random() * 5)],
              }}
            >
              {cat.name}
            </Link>
          )}
        </div>}
    </div>
  )
}
const UserDropDown = ({ UserMenuOpen, setUserMenuOpen, user }: {
  UserMenuOpen: boolean,
  setUserMenuOpen: Dispatch<SetStateAction<boolean>>,
  user: UserType
}) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];

  return (
    <div className="relative">
      <div
        className={`text-rosePine-text z-10 bg-rosePine-base mb-5 md:mt-0 max-h-[70vh] overflow-scroll md:absolute transition-opacity text-xl -right-5 md:w-40 top-10 text-center border border-rosePine-subtle rounded-lg
        ${UserMenuOpen ? '' : 'hidden'}`}
      >
        <Link
          href={`/user/profile`}
          className="py-2 block"
          style={{ color: colors[4], }}
        >
          Profile <User size={20} className="inline ml-2 relative right-1 bottom-[2px]" />
        </Link>
        <Link
          href={`/user/orders`}
          className="py-2 block"
          style={{ color: colors[1], }}
        >
          My Orders <Package size={20} className="inline ml-2 relative right-1 bottom-[2px]" />
        </Link>
        <Button variant={'ghost'} onClick={() => logout()}
          className='text-xl hover:bg-transparent'
          style={{ color: colors[0], }}
        >
          LogOut <LogOut />
        </Button>
      </div>
      {!user ?
        <Link
          className="scroll-m-20 text-rosePine-foam mix-blend-difference text-lg font-semibold tracking-tight"
          href="/auth?type=login">
          My Account <User2 size={20} className="inline text-rosePine-foam ml-2 relative right-1 bottom-[2px]" />
        </Link> :
        <button
          onClick={() => setUserMenuOpen(prev => !prev)}
          className="scroll-m-20 text-rosePine-foam mix-blend-difference text-lg font-semibold tracking-tight">
          {user.name}
          <User2 className="inline text-rosePine-foam ml-2" />
        </button>
      }
    </div>
  )
}
