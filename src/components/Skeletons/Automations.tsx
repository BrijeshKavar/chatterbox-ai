const Automations = () => {
    return (
        <div className="rounded-3xl p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-shrink-0 w-60">
            <div className="flex items-start flex-col gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
                <div className="flex-1 space-y-3 w-full">
                    <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" style={{ width: '70%' }} />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" style={{ width: '90%' }} />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" style={{ width: '60%' }} />
                </div>
            </div>
            <div className="h-9 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
        </div>
    )
}

export default Automations