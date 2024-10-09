import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUrl = (text: string) => {
  const id = text.split('!')[0]
  const name = text.split('!')[1]

  return `https://i.postimg.cc/${id}/${name}`
}
export const createParam = (link: string) => {
  // TASK:
  // https://i.postimg.cc/Wpwdbh2P/space-saturn.png
  //   to
  // Wpwdbh2P!space-saturn.png
  //
  const id = link.split('/')[3]
  const name = link.split('/')[4]

  return `/preview/${id}!${name}`
}
