import Link from "next/link";
import { ReactNode } from "react";

const links = [
  { text: 'Customers', link: '/dashboard/customers' },
  { text: 'Categories', link: '/dashboard/categories' },
  { text: 'Carousels', link: '/dashboard/carousels' },
]
export default async function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="bg-rosePineDawn-base min-h-screen">
      <nav>
        <ul className="flex bg-rosePineDawn-overlay h-12 text-rosePineDawn-text px-10 ">
          {links.map((link, index) =>
            <li key={index} >
              <Link href={link.link} className={`${index % 2 == 0 && 'bg-rosePineDawn-surface'} h-full flex items-center px-5`}>
                {link.text}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="px-10">
        {children}
      </div>
    </div>
  )
}
