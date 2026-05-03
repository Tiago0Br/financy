import {
  BaggageClaimIcon,
  BookOpenIcon,
  BriefcaseBusinessIcon,
  CarFrontIcon,
  DumbbellIcon,
  GiftIcon,
  HeartPulseIcon,
  HouseIcon,
  MailboxIcon,
  PawPrintIcon,
  PiggyBankIcon,
  ReceiptTextIcon,
  ShoppingCartIcon,
  TicketIcon,
  ToolCaseIcon,
  UtensilsIcon
} from 'lucide-react'
import type { ElementType } from 'react'

export const categoryIcons: Array<{ name: string; icon: ElementType }> = [
  { name: 'BriefcaseBusiness', icon: BriefcaseBusinessIcon },
  { name: 'CarFront', icon: CarFrontIcon },
  { name: 'HeartPulse', icon: HeartPulseIcon },
  { name: 'PiggyBank', icon: PiggyBankIcon },
  { name: 'ShoppingCart', icon: ShoppingCartIcon },
  { name: 'Ticket', icon: TicketIcon },
  { name: 'ToolCase', icon: ToolCaseIcon },
  { name: 'Utensils', icon: UtensilsIcon },
  { name: 'PawPrint', icon: PawPrintIcon },
  { name: 'House', icon: HouseIcon },
  { name: 'Gift', icon: GiftIcon },
  { name: 'Dumbbell', icon: DumbbellIcon },
  { name: 'BookOpen', icon: BookOpenIcon },
  { name: 'BaggageClaim', icon: BaggageClaimIcon },
  { name: 'Mailbox', icon: MailboxIcon },
  { name: 'ReceiptText', icon: ReceiptTextIcon }
]

export function getCategoryIcon(name: string) {
  return categoryIcons.find((icon) => icon.name === name)?.icon || UtensilsIcon
}
