import { Field, Int, ObjectType } from 'type-graphql'
import { TransactionModel } from '@/models/transaction.model.js'

@ObjectType()
export class PageInfo {
  @Field(() => Int)
  currentPage!: number

  @Field(() => Int)
  totalPages!: number

  @Field(() => Boolean)
  hasNextPage!: boolean

  @Field(() => Boolean)
  hasPreviousPage!: boolean

  @Field(() => Int)
  rangeStart!: number

  @Field(() => Int)
  rangeEnd!: number
}

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionModel])
  items!: TransactionModel[]

  @Field(() => Int)
  totalCount!: number

  @Field(() => PageInfo)
  pageInfo!: PageInfo
}
