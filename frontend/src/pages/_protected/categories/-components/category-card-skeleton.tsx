import { Skeleton } from '@/components/ui/skeleton'

export function CategoryCardSkeleton() {
  return (
    <div className="w-71 h-48 bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex justify-between">
        <Skeleton className="size-10 rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <Skeleton className="h-6 w-20 rounded-xl" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}
