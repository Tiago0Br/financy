import { Skeleton } from '@/components/ui/skeleton'

export function TransactionRowSkeleton() {
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-md shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-24 rounded-xl" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <Skeleton className="h-4 w-24 ml-auto" />
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
      </td>
    </tr>
  )
}
