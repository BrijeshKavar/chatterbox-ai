import { Skeleton } from '@/components/ui/skeleton'

const History = () => {
    return (
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 bg-gray-200 dark:bg-gray-600 rounded-lg" style={{ width: '80%' }} />
                <Skeleton className="h-3 bg-gray-200 dark:bg-gray-600 rounded-lg" style={{ width: '40%' }} />
            </div>
        </div>
    )
}

export default History