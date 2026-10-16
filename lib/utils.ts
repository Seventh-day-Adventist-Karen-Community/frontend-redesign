import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true })
  } catch {
    return dateString
  }
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'dd MMM yyyy, HH:mm')
  } catch {
    return dateString
  }
}

export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), 'dd MMM')
  } catch {
    return dateString
  }
}

export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() || ''
  const last = lastName?.charAt(0)?.toUpperCase() || ''
  return `${first}${last}`
}

export const avatarColors = [
  'bg-yellow-100 text-yellow-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
]

export function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

export const urgencyColors = {
  general: 'text-stone-500 bg-stone-50',
  soon:    'text-amber-700 bg-amber-50',
  urgent:  'text-red-700 bg-red-50',
}

export const statusColors = {
  pending:     'text-amber-700 bg-amber-50 border-amber-200 p-1 ',
  in_progress: 'text-yellow-700 bg-yellow-50 border-yellow-200 p-1',
  completed:   'text-emerald-700 bg-emerald-50 border-emerald-200 p-1',
  cancelled:   'text-stone-500 bg-stone-50 border-stone-200 p-1',
}

export const statusLabels = {
  pending:     'Pending',
  in_progress: 'In progress',
  completed:   'Completed',
  cancelled:   'Cancelled',
}