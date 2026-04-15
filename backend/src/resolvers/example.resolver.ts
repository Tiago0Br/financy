import { Query, Resolver } from 'type-graphql'
import { QueryExampleDto } from '../dtos/output/query-example.dto.js'

@Resolver()
export class ExampleResolver {
  @Query(() => QueryExampleDto)
  async example() {
    return {
      message: 'API is running!'
    }
  }
}
