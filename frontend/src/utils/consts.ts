import type { CategoryColor } from './types'

export const availableColors: CategoryColor[] = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green'
]

export const colorVariants: Record<
  CategoryColor,
  { iconBg: string; iconText: string; tagBg: string; tagText: string }
> = {
  blue: {
    iconBg: 'bg-blue-light',
    iconText: 'text-blue-base',
    tagBg: 'bg-blue-light',
    tagText: 'text-blue-dark'
  },
  purple: {
    iconBg: 'bg-purple-light',
    iconText: 'text-purple-base',
    tagBg: 'bg-purple-light',
    tagText: 'text-purple-dark'
  },
  pink: {
    iconBg: 'bg-pink-light',
    iconText: 'text-pink-base',
    tagBg: 'bg-pink-light',
    tagText: 'text-pink-dark'
  },
  red: {
    iconBg: 'bg-red-light',
    iconText: 'text-red-base',
    tagBg: 'bg-red-light',
    tagText: 'text-red-dark'
  },
  orange: {
    iconBg: 'bg-orange-light',
    iconText: 'text-orange-base',
    tagBg: 'bg-orange-light',
    tagText: 'text-orange-dark'
  },
  yellow: {
    iconBg: 'bg-yellow-light',
    iconText: 'text-yellow-base',
    tagBg: 'bg-yellow-light',
    tagText: 'text-yellow-dark'
  },
  green: {
    iconBg: 'bg-green-light',
    iconText: 'text-green-base',
    tagBg: 'bg-green-light',
    tagText: 'text-green-dark'
  }
}
