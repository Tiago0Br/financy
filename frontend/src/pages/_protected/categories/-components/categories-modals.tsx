import { AlertDialog } from '@/components/ui/alert-dialog'
import { CategoryModal } from '@/components/ui/category-modal'
import type { CreateCategoryFormData } from '@/utils/schemas'
import type { Category, CategoryColor } from '@/utils/types'

interface CategoriesModalsProps {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: (open: boolean) => void
  editingCategory: Category | null
  categoryToDelete: Category | null
  isDeleting: boolean
  onSubmit: (data: CreateCategoryFormData) => void
  confirmDelete: () => void
}

export function CategoriesModals({
  isModalOpen,
  setIsModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  editingCategory,
  categoryToDelete,
  isDeleting,
  onSubmit,
  confirmDelete
}: CategoriesModalsProps) {
  return (
    <>
      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmit}
        initialData={
          editingCategory
            ? {
                title: editingCategory.title,
                description: editingCategory.description,
                icon: editingCategory.icon,
                color: editingCategory.color as CategoryColor
              }
            : undefined
        }
      />

      <AlertDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Você tem certeza?"
        description={`Esta ação é irreversível e excluirá permanentemente a categoria "${categoryToDelete?.title}".`}
        confirmText="Excluir"
        variant="danger"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  )
}
