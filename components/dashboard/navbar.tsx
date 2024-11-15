'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { text: 'Home', link: '/' },
  { text: 'Customers', link: '/dashboard/customers' },
  { text: 'Categories', link: '/dashboard/categories' },
  { text: 'Carousels', link: '/dashboard/carousels' },
  { text: 'Products', link: '/dashboard/products' },
  { text: 'Orders', link: '/dashboard/orders' },
]
export default function Navbar() {
  const path = usePathname();
  return (
    <nav>
      <ul className="flex bg-rosePineDawn-overlay text-rosePineDawn-text px-10 w-screen flex-wrap">
        {links.map((link, index) =>
          <li key={index} >
            <Link href={link.link} className={`
                ${index % 2 == 0 && 'bg-rosePineDawn-surface '}
                ${link.link === path && 'border-b-2 border-b-rosePineDawn-love'}
                h-12 flex items-center px-2 md:px-5
                `}>
              {link.text}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
