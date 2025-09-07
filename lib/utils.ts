import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
type ISO = string

const CC_TO_ISO: Record<string, ISO> = {
  '1': 'US',
  '7': 'RU',
  '20': 'EG',
  '27': 'ZA',
  '30': 'GR',
  '31': 'NL',
  '32': 'BE',
  '33': 'FR',
  '34': 'ES',
  '36': 'HU',
  '39': 'IT',
  '44': 'GB',
  '49': 'DE',
  '55': 'BR',
  '61': 'AU',
  '62': 'ID',
  '63': 'PH',
  '64': 'NZ',
  '65': 'SG',
  '66': 'TH',
  '81': 'JP',
  '82': 'KR',
  '84': 'VN',
  '86': 'CN',
  '90': 'TR',
  '91': 'IN',
  '92': 'PK',
  '94': 'LK',
  '98': 'IR',
  '212': 'MA',
  '234': 'NG',
  '251': 'ET',
  '971': 'AE',
  '972': 'IL',
  '974': 'QA',
}

const normalizePhone = (raw: string) => raw.trim().replace(/[^\d+]/g, '')

const extractCallingCode = (raw: string): string | null => {
  const s = normalizePhone(raw)
  const digits = s.startsWith('+') ? s.slice(1) : s
  for (const len of [3, 2, 1]) {
    const cc = digits.slice(0, len)
    if (CC_TO_ISO[cc]) return cc
  }
  return null
}

const isoToFlagEmoji = (iso?: string): string => {
  if (!iso) return '🌐'
  const code = iso.toUpperCase()
  const A = 0x41
  const RI_A = 0x1f1e6
  return (
    String.fromCodePoint(RI_A + (code.charCodeAt(0) - A)) +
    String.fromCodePoint(RI_A + (code.charCodeAt(1) - A))
  )
}

export function flagEmojiFromPhone(phone: string): string {
  const cc = extractCallingCode(phone)
  const iso = cc ? CC_TO_ISO[cc] : undefined
  return isoToFlagEmoji(iso)
}
