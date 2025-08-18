import { Skeleton } from '@/components/ui/skeleton'

const RecentChat = () => {
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700">
            <Skeleton className="w-24 h-4 rounded bg-gray-200 dark:bg-gray-600" />
        </div>
    )
}

export default RecentChat