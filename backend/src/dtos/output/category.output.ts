import { Field, Float, Int, ObjectType } from 'type-graphql'
import { CategoryModel } from '@/models/category.model.js'

@ObjectType()
export class TopCategory {
  @Field(() => CategoryModel)
  category!: CategoryModel

  @Field(() => Int)
  transactionCount!: number

  @Field(() => Float)
  totalAmount!: number
}
