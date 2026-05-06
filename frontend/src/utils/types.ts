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

export type TransactionType = 'INCOME' | 'OUTCOME'

export interface Transaction {
  id: string
  type: TransactionType
  description: string
  amount: number
  date: string
  category: {
    id: string
    title: string
    color: CategoryColor
    icon: string
  }
}

export interface PaginatedTransactions {
  items: Transaction[]
  totalCount: number
  pageInfo: {
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    rangeEnd: number
    rangeStart: number
  }
}
