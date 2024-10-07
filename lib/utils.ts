import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseGlink(link: string): string {
  if (!link) return ""

  // https://drive.google.com/file/d/1Xc4OqN8kUI-_Jl9cutKs-P8dIGUniDs7/view?usp=drive_link
  if (link.includes('file/d/')) {
    const id = link.split('/')[5]
    return `https://drive.google.com/uc?export=view&id=${id}`
  }

  // https://drive.usercontent.google.com/download?id=1zhuSZCT5clvWD2iqAZFRyvFLFZWjePvO&export=download
  if (link.includes('download?id=')) {
    const id = link.split('=')[1].split('&')[0]
    return `https://drive.google.com/uc?export=view&id=${id}`
  }
  return ""
}
