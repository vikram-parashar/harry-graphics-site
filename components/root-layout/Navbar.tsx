'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Hamburger,
  LogInIcon,
  LogOut,
  MoveDownRight,
  Package,
  ShoppingCart,
  User2,
  X,
  Menu,
  Users,
} from 'lucide-react'
import { createClient } from '@/supabase/utils/client'
import { logout } from '@/lib/actions/auth'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'
import { Tables } from '@/lib/database.types'

function Navbar({
  categories,
}: {
  categories: Pick<Tables<'categories'>, 'id' | 'name'>[]
}) {
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()
  const [username, setUsername] = useState<null | string>(null)

  const getUser = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching user:', error)
      return
    }
    const currentUser = data.session?.user.user_metadata.name || null
    setUsername(currentUser)
  }

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    setProductsOpen(false)
  }, [pathname])

  return (
    <div className="flex mx-auto lg:max-w-[90vw] justify-between items-center p-5 lg:py-10">
      <Link
        href="/"
        className="w-[187px] lg:w-[350px] h-[60px] lg:h-[112px] relative bg-background rounded-xl z-10 m-2 lg:m-0"
      >
        <Image
          src="/logo/nobg.png"
          alt="logo"
          fill
          sizes="(max-width: 768px) 187px, 350px"
        />
      </Link>
      <div className="flex lg:hidden">
        <MobileNav categories={categories} isLoggedIn={username != null} />
      </div>
      <div
        className={cn(
          'hidden z-20 lg:block uppercase bg-secondary-background p-3',
          'text-nowrap text-2xl text-main-foreground font-bold rounded-xl shadow-shadow',
          productsOpen && 'absolute right-[5vw] top-12'
        )}
      >
        <ul className="flex items-center">
          <li className="border-r-3 px-5 border-main-foreground">
            <Link href="/sheets"> Sheets </Link>
          </li>
          <li className="border-r-3 pl-5 pr-3 border-main-foreground">
            <button onClick={() => setProductsOpen((curr) => !curr)}>
              SERVICES{' '}
              <MoveDownRight
                className={cn(
                  'inline transition-transform mb-1',
                  productsOpen && '-rotate-90'
                )}
              />
            </button>
          </li>
          <li className="border-r-3 px-5 border-main-foreground">
            <Link href="/contact-us"> Contact Us </Link>
          </li>
          <li className="px-5">
            <Link href="/get-a-quote"> Get a quote </Link>
          </li>
          <UserBtn username={username} />
        </ul>
        <div
          className={cn(
            'p-5 grid-cols-2 mr-20',
            productsOpen ? 'grid' : 'hidden'
          )}
        >
          {categories.map((category, index) => (
            <p
              key={index}
              className="text-2xl font-semibold text-main-foreground"
            >
              <Link href={`/category/${category.id}`}>{category.name}</Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

const MobileNav = ({
  categories,
  isLoggedIn,
}: {
  categories: Pick<Tables<'categories'>, 'id' | 'name'>[]
  isLoggedIn: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 w-screen h-screen z-20',
          open ? 'bg-overlay' : 'hidden'
        )}
      >
        <div className="flex justify-between py-7 px-6 items-center">
          <Link
            href="/"
            className="w-[187px] lg:w-[350px] h-[60px] lg:h-[112px] relative bg-background rounded-xl block"
          >
            <Image
              src="/logo/nobg.png"
              alt="logo"
              fill
              sizes="(max-width: 768px) 187px, 350px"
            />
          </Link>
          <div className="bg-background rounded-full w-[70px] h-[70px] border-4 border-main-foreground relative">
            <button onClick={() => setOpen((curr) => !curr)}>
              <Image
                src="/shut-down.png"
                alt="shutdown"
                className="scale-[0.6]"
                fill
              />
            </button>
          </div>
        </div>
        <ul className="text-black pl-10 text-4xl font-semibold flex flex-col gap-3 mt-20 uppercase">
          <li>
            <Link href="/sheets"> Sheets </Link>
          </li>
          <li>
            <button onClick={() => setProductsOpen((curr) => !curr)}>
              PRODUCTS{' '}
              <MoveDownRight
                className={cn(
                  'inline transition-transform',
                  productsOpen && '-rotate-90'
                )}
              />
            </button>
            <div
              className={cn(
                'p-5 mr-20 max-h-[40vh] text-3xl overflow-y-scroll',
                productsOpen ? 'block' : 'hidden'
              )}
            >
              {categories.map((category, index) => (
                <p
                  key={index}
                  className="text-2xl font-semibold text-main-foreground mb-3"
                >
                  <Link target="_blank" href={`/category/${category.id}`}>
                    {category.name}
                  </Link>
                </p>
              ))}
            </div>
          </li>
          <li>
            <Link href="/contact-us"> Contact Us </Link>
          </li>
          <li>
            <Link href="/get-a-quote"> Get a quote </Link>
          </li>
        </ul>
        <ul className="text-black text-3xl font-semibold flex flex-col gap-3 mt-20 border-t-2 py-5 mx-auto w-[80%] border-background uppercase">
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/user/cart">
                  <ShoppingCart className="inline mb-1 mr-2" />
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/user/orders">
                  <Package className="inline mb-1 mr-2" />
                  MY ORDERS
                </Link>
              </li>
              <li>
                <Link href="/user/profile">
                  <User2 className="inline mb-1 mr-2" />
                  USER PROFILE
                </Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    setOpen(false)
                    localStorage.setItem('cart', JSON.stringify([]))
                    const res = await logout()
                    if (!res.success) {
                      toast.error(res.msg)
                    } else {
                      window.location.reload()
                    }
                  }}
                >
                  <LogOut className="inline mb-1 mr-2" />
                  LOG OUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login">
                  <LogInIcon className="inline mb-1 mr-2" />
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/signup">
                  <Users className="inline mb-1 mr-2" />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="bg-main rounded-full w-[70px] h-[70px] right-5 top-3 border-4 border-main-foreground flex justify-center items-center">
        <button onClick={() => setOpen((curr) => !curr)}>
          <Menu size={35} />
        </button>
      </div>
    </>
  )
}

const UserBtn = ({ username }: { username: string | null }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUserMenuOpen(false)
  }, [pathname])

  return (
    <div>
      {username ? (
        <li className="px-5 py-2 bg-background rounded-2xl">
          <button
            onClick={() => setUserMenuOpen((curr) => !curr)}
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            {username}
            {userMenuOpen ? (
              <X className="inline mb-1 ml-2" />
            ) : (
              <Hamburger className="inline mb-1 ml-2" />
            )}
          </button>
        </li>
      ) : (
        <li className="px-5 py-2 bg-background rounded-2xl">
          <Link
            href="/auth/login"
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            Login
            <LogInIcon className="inline mb-1 ml-2" />
          </Link>
        </li>
      )}
      {username && userMenuOpen && <UserMenu />}
    </div>
  )
}

const UserMenu = () => {
  const [btnDisabled, setBtnDisabled] = useState(false)
  return (
    <>
      <ul className="flex flex-col gap-5 mt-7 scale-75 lg:scale-90 origin-top z-10 absolute left-16 lg:left-auto">
        <li className="px-5 py-2 bg-background rounded-2xl border-4">
          <Link
            href="/user/cart"
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            <ShoppingCart className="inline mb-1 mr-2" />
            Shopping Cart
          </Link>
        </li>
        <li className="px-5 py-2 bg-background rounded-2xl border-4">
          <Link
            href="/user/orders"
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            <Package className="inline mb-1 mr-2" />
            MY ORDERS
          </Link>
        </li>
        <li className="px-5 py-2 bg-background rounded-2xl border-4">
          <Link
            href="/user/profile"
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            <User2 className="inline mb-1 mr-2" />
            USER PROFILE
          </Link>
        </li>
        <li className="px-5 py-2 bg-background rounded-2xl border-4">
          <button
            onClick={async () => {
              setBtnDisabled(true)
              localStorage.setItem('cart', JSON.stringify([]))
              const res = await logout()
              if (!res.success) {
                toast.error(res.msg)
              } else {
                window.location.reload()
              }
              setBtnDisabled(false)
            }}
            disabled={btnDisabled}
            style={{
              color: 'var(--main-foreground)',
            }}
          >
            <LogOut className="inline mb-1 mr-2" />
            {btnDisabled ? 'LOGGING OUT...' : 'LOG OUT'}
          </button>
        </li>
      </ul>
    </>
  )
}

export default Navbar
