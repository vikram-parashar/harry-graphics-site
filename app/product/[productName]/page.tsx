'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { House, Telescope } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'

const data = {
  types: [
    { name: 'PVC ID Card', pics: [] },
    { name: 'School ID Card', pics: [] },
    { name: 'Office ID Card', pics: [] },
    { name: 'Visiting Card', pics: [] },
    { name: 'Conference Id Card', pics: [] },
    { name: 'Card Holder', pics: [] },
    { name: 'Luggage Tag', pics: [] },
  ]
}
const slides = [
  'slide.jpg',
  'slide2.jpg',
  'slide3.jpg',
  'slide4.jpg',
  'slide5.jpg',
]

export default function Page({ params }: { params: { productName: string } }) {
  const [previwImage, setPreviewImage] = useState<string | null>(null)

  return (
    <>
      {previwImage == null ? (
        <div className="px-5">
          <div className="flex justify-between items-center py-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {params.productName.toLocaleUpperCase()}
            </h1>
            <Link href="/" >
              <House className="" />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:gap-4 md:items-center md:h-[88vh]">
            <Image
              src={`/products/${params.productName}/main.jpg`}
              alt={'slide'}
              width={1000}
              height={750}
              className="object-cover w-full rounded-2xl"
            />
            <Accordion type="single" collapsible className="w-full md:h-[88vh] overflow-scroll md:pr-2 md:flex md:flex-col md:justify-center" defaultValue={data.types[0].name}>
              {data.types.map(type => (
                <AccordionItem value={type.name} key={type.name}>
                  <AccordionTrigger className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight">
                    {type.name}
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Dialog>
                      <DialogTrigger><Telescope className="w-4 h-4 inline mr-2" />View Specifications</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{type.name} Specifications</DialogTitle>
                          <DialogDescription className="text-left">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                              Crafting Unique ID Cards to Reflect Your Identity</h4>
                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                              <li>Material: PVC 0.8 mm thickness card</li>
                              <li>Finish: Semi-Gloss</li>
                              <li>Size: 8.5 cm x 5.4 cm</li>
                              <li>Decoration Technology: Digital Printing</li>
                              <li>Decoration Area: Front</li>
                              <li>Looking for Personalised Lanyards? Click here</li>
                              <li>Please do not print Aadhar Cards/PAN cards/Voter IDs/Driving License or any ID Cards/Lanyards belonging to Government/Government Authorities/Quasi Government bodies.</li>
                              <li>You are solely accountable/liable for the product and its utilization in the event that it is found to be offensive, harmful, harassing, libelous, threatening, obscene, malicious, or otherwise objectionable or illegal.</li>
                            </ul>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {slides.map(slide => (
                      <Image
                        key={slide}
                        src={`/slides/${slide}`}
                        alt={slide}
                        width={200}
                        height={200}
                        className="rounded-xl object-cover w-full"
                        onClick={() => setPreviewImage(`/slides/${slide}`)}
                      />))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>) :
        <Image
          src={previwImage || ""}
          alt="previwImage"
          width={1920}
          height={1080}
          className="object-cover w-screen px-5 md:px-10 absolute top-[50vh] -translate-y-1/2"
          onClick={() => setPreviewImage(null)}
        />
      }
    </>
  )
}
