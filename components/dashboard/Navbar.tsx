'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { text: 'Home', link: '/' },
  { text: 'Orders', link: '/dashboard/orders' },
  { text: 'Products', link: '/dashboard/products' },
  { text: 'Categories', link: '/dashboard/categories' },
  { text: 'Carousels', link: '/dashboard/carousels' },
  { text: 'Customers', link: '/dashboard/customers' },
  { text: 'Organizations', link: '/dashboard/organizations' },
]
export default function Navbar() {
  const path = usePathname()
  return (
    <nav>
      <ul className="flex bg-secondary-background text-background px-10 w-screen flex-wrap">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.link}
              className={`
                ${index % 2 == 0 && 'bg-rosePineDawn-surface '}
                ${link.link === path && 'border-b-2 border-b-overlay'}
                h-12 flex items-center px-2 md:px-5
                `}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
