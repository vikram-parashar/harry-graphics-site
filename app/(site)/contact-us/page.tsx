import ContactPage from '@/components/contact-us/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Harry Graphics',
  description:
    'Get in touch with Harry Graphics for all your printing needs. We are here to assist you with any inquiries or support you may require.',
}

export default function Page() {
  return <ContactPage />
}
