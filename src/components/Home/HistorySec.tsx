import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getChatHistory } from '@/components/mockChats'
import History from '@/components/Skeletons/History'

const HistorySec = () => {
    const [history, setHistory] = useState<HistoryItem[] | null>(null)
    const [isFetching, setIsFetching] = useState(true)

    const { toast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        try {
            setIsFetching(true)
            await new Promise(res => {
                setTimeout(() => {
                    res(setHistory(getChatHistory()))
                }, 500)
            })
        } catch (error: any) {
            toast({ title: error?.message || "Error fetching history" })
        } finally {
            setIsFetching(false)
        }
    }

    return (
        <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">History</h3>
            {isFetching ? (
                <div className="space-y-2">
                    {[1, 2, 3, 4].map((index) => (
                        <History key={index} />
                    ))}
                </div>
            ) : !!history?.length ? (
                <div className="space-y-2">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-1 rounded-4xl border border-gray-100 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer bg-gray-100 bg-card hover:bg-card/80"
                            onClick={() => navigate(`/chat/${encodeURIComponent(btoa(item.id.toString()))}`)}
                        >
                            <div className="bg-[#f0e6ff] w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{item.text}</p>
                                {/* <p className="text-xs text-muted-foreground">{item.timestamp}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-muted/50 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-2">No History Yet</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                        Your chat history will appear here
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchHistory()}
                    >
                        Try Again
                    </Button>
                </div>
            )}
        </div>
    )
}

export default HistorySec
