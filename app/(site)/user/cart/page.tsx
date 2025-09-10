import Cart from '@/components/user/Cart'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Cart - Harry Graphics',
  description:
    'View and manage your shopping cart at Harry Graphics. Review your selected items, update quantities, and proceed to checkout for a seamless shopping experience.',
}

export default function Page() {
  return <Cart />
}
