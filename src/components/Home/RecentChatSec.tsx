import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RecentChat from '@/components/Skeletons/RecentChat';

const dummyRecentChat: RecentChat[] = [
    { id: 1, text: "Explore Animal Behavior", background: "#e6ffce" },
    { id: 2, text: "Analyze Tree Growth?", background: "#f0e6ff" },
    { id: 3, text: "Decomposition?", background: "#ffefb9" },
    { id: 4, text: "Enzymes", background: "#e6ffce" },
    { id: 5, text: "Identify Birds", background: "#f0e6ff" }
];


const RecentChatSec = () => {
    const [recentChat, setRecentChat] = useState<RecentChat[] | null>(null)
    const [isFetching, setIsFetching] = useState(true)

    const { toast } = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecentChat()
    }, [])

    const fetchRecentChat = async () => {
        try {
            setIsFetching(true)
            await new Promise(res => {
                setTimeout(() => {
                    res(setRecentChat(dummyRecentChat))
                }, 500)
            })
        } catch (error: any) {
            toast({ title: error?.message || "Error fetching recent chat" })
        } finally {
            setIsFetching(false)
        }
    }

    return (
        <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Chat
            </h2>

            <div className="flex flex-wrap gap-2">
            {isFetching ? (
                    <>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <RecentChat key={index} />
                        ))}
                    </>
                ) : !!recentChat?.length ? (
                    <>
                        {recentChat?.map((chat, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full border-0 text-foreground hover:opacity-80 transition-all duration-200"
                                    style={{ 
                                        backgroundColor: chat.background,
                                    }}
                                    onClick={() => navigate('/chat', { state: { initialMessage: chat.text } })}
                                >
                                    <span>{chat.text}</span>
                                </Button>
                            );
                        })}
                    </>
                ) : (
                    <div className="text-center py-12 w-full">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <MessageCircle className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                            No Recent Chats
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            You haven't had any recent conversations yet.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchRecentChat()}
                        >
                            Try Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentChatSec