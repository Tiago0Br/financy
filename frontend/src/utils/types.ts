export type CategoryColor =
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'

export interface User {
  id: string
  name: string
  email: string
}

export interface Category {
  id: string
  title: string
  description?: string
  icon: string
  color: string
  userId: string
  user: User
  createdAt: string
  updatedAt: string
}

export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
  id: string
  description: string
  date: string
  category: {
    name: string
    color: CategoryColor
    icon: string
  }
  type: TransactionType
  amount: number
}
