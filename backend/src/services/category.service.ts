import type {
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/dtos/input/category.input.js'
import { prisma } from '@/lib/prisma.js'

export class CategoryService {
  async create(data: CreateCategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId
      }
    })
  }

  async list(userId: string) {
    return prisma.category.findMany({
      where: { userId }
    })
  }

  async getById(categoryId: string, userId: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId
      }
    })

    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`)
    }

    return category
  }

  async update(data: UpdateCategoryInput, userId: string) {
    return prisma.category.update({
      where: {
        id: data.id,
        userId
      },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color
      }
    })
  }

  async delete(categoryId: string, userId: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId
      }
    })

    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`)
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
        userId
      }
    })
  }
}
