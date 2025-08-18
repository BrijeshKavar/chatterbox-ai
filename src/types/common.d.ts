interface AutomationCard {
    id: number
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    gradient: string
}

interface RecentChat {
    id: number
    text: string
    background: string
}

interface HistoryItem {
    id: number
    text: string
    timestamp: string
}

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}