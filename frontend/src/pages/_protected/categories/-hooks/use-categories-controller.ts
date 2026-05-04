import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY
} from '@/lib/graphql/mutations/category'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category'
import type {
  CreateCategoryFormData,
  UpdateCategoryFormData
} from '@/utils/schemas'
import type { Category } from '@/utils/types'

export function useCategoriesController() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  )

  const { data, loading, refetch } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const [createCategory] = useMutation<
    unknown,
    { data: CreateCategoryFormData }
  >(CREATE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria cadastrada!')
      setIsModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível criar a categoria')
    }
  })

  const [updateCategory] = useMutation<
    unknown,
    { data: UpdateCategoryFormData }
  >(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria atualizada!')
      setIsModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível atualizar a categoria')
    }
  })

  const [deleteCategory, { loading: isDeleting }] = useMutation<
    unknown,
    { id: string }
  >(DELETE_CATEGORY, {
    onCompleted() {
      toast.success('Categoria removida!')
      setIsDeleteModalOpen(false)
      refetch()
    },
    onError() {
      toast.error('Não foi possível remover a categoria')
    }
  })

  async function onSubmit(formData: CreateCategoryFormData) {
    if (editingCategory) {
      await updateCategory({
        variables: {
          data: {
            id: editingCategory.id,
            title: formData.title,
            description: formData.description,
            color: formData.color,
            icon: formData.icon
          }
        }
      })
      return
    }

    await createCategory({
      variables: {
        data: {
          title: formData.title,
          description: formData.description,
          color: formData.color,
          icon: formData.icon
        }
      }
    })
  }

  function handleOpenCreate() {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  function handleOpenEdit(category: Category) {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  function handleOpenDelete(category: Category) {
    setCategoryToDelete(category)
    setIsDeleteModalOpen(true)
  }

  async function confirmDelete() {
    if (!categoryToDelete) return

    await deleteCategory({
      variables: {
        id: categoryToDelete.id
      }
    })
  }

  return {
    categories: data?.listCategories ?? [],
    loading,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingCategory,
    categoryToDelete,
    isDeleting,
    onSubmit,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    confirmDelete
  }
}
