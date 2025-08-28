import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SocialIcons() {
  return (
    <>
      <Button asChild size="icon" className="bg-background">
        <Link target="_blank" href="mailto:harrygraphics21@gmail.com"><Mail className="stroke-black" strokeWidth={2} /></Link>
      </Button>
      <Button asChild size="icon" className="bg-background">
        <Link target="_blank" href="https://www.instagram.com"> <Instagram className="fill-rosePine-gold stroke-black" strokeWidth={2} /> </Link>
      </Button>
      <Button asChild size="icon" className="bg-background">
        <Link target="_blank" href="https://www.facebook.com/HarryGraphics/"><Facebook className="stroke-black" strokeWidth={2} /></Link>
      </Button>
      <Button asChild size="icon" className="bg-background">
        <Link target="_blank" href="https://www.youtube.com/@HarryGraphics-FBD"><Youtube className="stroke-black" strokeWidth={2} /></Link>
      </Button>
    </>
  )
}
