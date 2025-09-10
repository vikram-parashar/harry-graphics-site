'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Highlighter } from '@/components/magicui/highlighter'
import { flagEmojiFromPhone } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { handleMail } from '@/lib/actions/mail'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  your_company: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  subject: z.string({
    message: 'Subject is required.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

const subjectOptions = [
  'General Inquiry',
  'Support',
  'Sales',
  'Feedback',
  'Item Specifications',
  'Order Status',
]

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '+91 ',
      your_company: '',
      subject: '',
      message: '',
    },
  })

  const [btnDisabled, setBtnDisabled] = useState(false)

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setBtnDisabled(true)
    const res = await handleMail(
      `Inquiry on ${data.subject} from harrygraphics.in`,
      `
                         <h2>From: ${data.name}</h2>
                         <h3>Contact(s): ${data.phone}</h3>
                         <h3>Company: ${data.your_company}</h3>
                         <p>Message: ${data.message}</p>
                        `
    )

    if (res.success) {
      form.reset()
      toast.success(res.msg)
    } else {
      toast.error(res.msg)
    }
    setBtnDisabled(false)
  }
  return (
    <div className="bg-background py-10 border-3 rounded-lg">
      <h1 className="text-5xl my-5 p-2 mb-5 text-center">
        <Highlighter>Contact Us</Highlighter>
      </h1>
      <div className="flex flex-col lg:flex-row gap-5 px-5">
        <div className="flex-1 lg:px-5">
          <p className="uppercase text-xl lg:text-2xl font-bold">
            Go ahead and send us a message. We respond to all messages the
            moment we receive.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 lg:space-y-8 h-full flex flex-col justify-center lg:mb-20"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-2xl">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What should we call you by?"
                        {...field}
                        className="shadow-shadow lg:text-xl lg:h-12 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-xl">Phone Number</FormLabel>
                    <span className="absolute lg:text-xl top-[50px] lg:top-[50px] left-3">
                      {flagEmojiFromPhone(field.value)}
                    </span>
                    <FormControl>
                      <Input
                        placeholder="+91 xxxxx xxxxx"
                        {...field}
                        className="shadow-shadow lg:text-xl lg:h-12 pl-10"
                      />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="your_company"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-2xl">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="shadow-shadow lg:text-xl lg:h-12 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-2xl">Subject</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="shadow-shadow lg:text-xl lg:h-12 w-full bg-secondary-background">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary-background">
                          <SelectGroup>
                            {subjectOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="lg:text-xl"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-2xl">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="shadow-shadow lg:text-xl lg:h-12 "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={btnDisabled} type="submit" className="w-1/3">
                {btnDisabled ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
        <iframe
          className="flex-1 lg:mx-10"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.174054888763!2d77.31444587664623!3d28.323333875835036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbba71a4f7bb%3A0x99d2598fe9269101!2sHarry%20Graphics%2C%20ID%20Card%20Manufacturers%20and%20Printers!5e0!3m2!1sen!2sin!4v1698336947246!5m2!1sen!2sin"
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
