import { Field, GraphQLISODateTime, InputType } from 'type-graphql'
import { TransactionType } from '@/models/transaction.model.js'

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => Number, { nullable: true })
  amount?: number

  @Field(() => String, { nullable: true })
  categoryId?: string
}

@InputType()
export class FindTransactionsInput {
  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  categoryId?: string
}
