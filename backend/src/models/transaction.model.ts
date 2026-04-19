import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType
} from 'type-graphql'
import { CategoryModel } from './category.model.js'
import { UserModel } from './user.model.js'

export enum TransactionType {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME'
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Transaction type (income or outcome)'
})

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => TransactionType)
  type!: string

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  categoryId!: string

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
