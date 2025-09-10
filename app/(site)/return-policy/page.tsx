import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Return Policy - Harry Graphics',
  description:
    'Discover Harry Graphics return policy. Enjoy free returns, a 7-day reflection period, and hassle-free exchanges or refunds within 30 days.',
}

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-rosePine-base text-rosePine-text text-2xl dark px-5">
      <div>
        <h1 className="text-rosePine-iris text-4xl">
          All the promises we keep:
        </h1>
        <ul className="return-bullets">
          <li>Free return of the product.</li>
          <li>7 days of reflection after receiving the product.</li>
          <li>
            Do you want to change the product? We send you the new product on
            the same day of receipt.
          </li>
          <li>
            Would you prefer us to refund your money? We will refund you within
            3 days of receipt.
          </li>
          <li>Is the product broken after 30 days?</li>
        </ul>
      </div>
    </div>
  )
}
