import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class QueryExampleDto {
  @Field(() => String)
  message!: string
}
