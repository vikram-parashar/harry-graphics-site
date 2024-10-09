import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function SocialIcons() {
  return (
    <>
      <Link target="_blank" href="mailto:harrygraphics21@gmail.com"><Mail className="fill-rosePineMoon-iris stroke-black" strokeWidth={1} /></Link>
      <Link target="_blank" href=""> <Instagram className="fill-rosePine-gold stroke-black" strokeWidth={1} /> </Link>
      <Link target="_blank" href="https://www.facebook.com/HarryGraphics/"><Facebook className="fill-rosePine-pine stroke-black" strokeWidth={1} /></Link>
      <Link target="_blank" href="https://www.youtube.com/@HarryGraphics-FBD"><Youtube className="fill-rosePine-love stroke-black"strokeWidth={1}  /></Link>
    </>
  )
}
