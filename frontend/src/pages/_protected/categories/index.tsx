import { createFileRoute } from '@tanstack/react-router'
import { CategoriesGrid } from './-components/categories-grid'
import { CategoriesHeader } from './-components/categories-header'
import { CategoriesModals } from './-components/categories-modals'
import { CategoriesSummary } from './-components/categories-summary'
import { useCategoriesController } from './-hooks/use-categories-controller'

export const Route = createFileRoute('/_protected/categories/')({
  component: CategoriesPage
})

function CategoriesPage() {
  const {
    categories,
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
  } = useCategoriesController()

  return (
    <main className="p-6 md:p-12 flex flex-col gap-8">
      <CategoriesHeader onOpenCreate={handleOpenCreate} />

      <CategoriesModals
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        editingCategory={editingCategory}
        categoryToDelete={categoryToDelete}
        isDeleting={isDeleting}
        onSubmit={onSubmit}
        confirmDelete={confirmDelete}
      />

      <CategoriesSummary
        categoriesCount={categories.length}
        loading={loading}
      />

      <CategoriesGrid
        categories={categories}
        loading={loading}
        onOpenEdit={handleOpenEdit}
        onOpenDelete={handleOpenDelete}
      />
    </main>
  )
}
