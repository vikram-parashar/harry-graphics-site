'use client'
import { handleMail } from '@/lib/actions';
import { useFormState } from 'react-dom';
import SubmitBtn from "@/components/ui/submit-btn"

const initialState = {
  errors: {
    name: [''],
    email: [''],
    message: [''],
  }
}
export default function ContactForm() {
  const [state, formAction] = useFormState(handleMail, initialState)

  return (
    <div className="bg-rosePine-base pb-10">
      <div className="mx-auto max-w-md px-5 py-16 lg:mx-auto lg:flex lg:max-w-6xl">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="mb-6 text-3xl text-rosePine-iris lg:text-5xl lg:leading-snug">
            SEND US A MESSAGE
          </h1>
          <p className="mb-8 w-4/5 text-rosePine-iris">
            If you are interested in hearing more about the way we work, have a
            business proposal, or are interested in making a purchase, we would
            love to hear from you.
          </p>
          {/* Seprator */}
          <div className="clr-invert mb-6 h-[6px] w-12 lg:h-4 lg:w-24"></div>
        </div>

        {/* Form */}
        <form action={formAction} className="lg:w-1/2 text-rosePine-text flex flex-col gap-2">
          <div>
            <label className='bg-rosePine-base px-1 relative top-3 left-5'>Name</label>
            <input
              className="block rounded-md w-full border-2 border-rosePine-gold bg-rosePine-base p-3 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none"
              type="text"
              placeholder="Your Name"
              name="name"
            />
            <p aria-live="polite" className="text-rosePine-subtle text-right">
              {state?.errors?.name}
            </p>
          </div>
          <div>
            <label className='bg-rosePine-base px-1 relative top-3 left-5'>Email</label>
            <input
              className="block w-full border-2 rounded-md border-rosePine-gold bg-rosePine-base p-3 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none"
              type="email"
              placeholder="Email"
              name="email"
            />
            <p aria-live="polite" className="text-rosePine-subtle text-right">
              {state?.errors?.email}
            </p>
          </div>
          <div>
            <label className='bg-rosePine-base px-1 relative top-3 left-5'>Message</label>
            <textarea
              className="block w-full border-2 rounded-md border-rosePine-gold bg-rosePine-base p-3 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none"
              placeholder="Message"
              name="message"
              rows={4}
            />
            <p aria-live="polite" className="text-rosePine-subtle text-right">
              {state?.errors?.message}
            </p>
          </div>
          {state?.sent ?
            <button type="submit" disabled={true}
              className="rounded-md bg-rosePine-gold px-16 py-3 font-bold text-rosePine-base cursor-pointer mt-5 disabled:opacity-70"
            >
              {state?.sent}
            </button> :
            <SubmitBtn text="Submit Query" />
          }
        </form>
      </div>
    </div>
  );
}
