import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Globe, Leaf, Heart, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import Automations from '@/components/Skeletons/Automations';

const dummyAutomationCards: AutomationCard[] = [
    {
        id: 1,
        title: "What is photosynthesis?",
        description: "Photosynthesis is the process by which plants convert light into energy.",
        icon: Leaf,
        gradient: "gradient-primary"
    },
    {
        id: 2,
        title: "How do plants use glucose?",
        description: "Plants use glucose for energy through cellular respiration.",
        icon: Globe,
        gradient: "gradient-secondary"
    },
    {
        id: 3,
        title: 'Sentiment Analysis',
        description: 'Analyze conversation sentiment and adjust responses accordingly',
        icon: Heart,
        gradient: 'gradient-primary'
    }
];

const AutomationSec = () => {
    const [automationCards, setAutomationCards] = useState<AutomationCard[] | null>(null)
    const [isFetching, setIsFetching] = useState(true)

    const { toast } = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        fetchAutomationCards()
    }, [])

    const fetchAutomationCards = async () => {
        try {
            setIsFetching(true)
            await new Promise(res => {
                setTimeout(() => {
                    res(setAutomationCards(dummyAutomationCards))
                }, 500)
            })
        } catch (error: any) {
            toast({ title: error?.message || "Error fetching automation cards" })
        } finally {
            setIsFetching(false)
        }
    }

    const handleGenerateQuestion = (cardId: number) => {
        const card = automationCards?.find(c => c.id === cardId);
        if (card) {
            navigate('/chat', { state: { initialMessage: card.title } });
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
                Automations
            </h2>

            <div className="relative">
                {isFetching ? (
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[1, 2, 3].map((index) => (
                            <Automations key={index} />
                        ))}
                    </div>
                ) : !!automationCards?.length ? (
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {automationCards?.map((card: AutomationCard) => {
                            const IconComponent = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className={`${card.gradient} rounded-3xl p-4 flex-shrink-0 w-60 flex flex-col`}
                                >
                                    <div className="flex items-start flex-col gap-4 mb-4 flex-1">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <IconComponent className="w-5 h-5 text-black" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground mb-2">
                                                {card.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="generate"
                                        size="sm"
                                        onClick={() => handleGenerateQuestion(card.id)}
                                        className="w-full rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200 border-0 flex items-center justify-between pl-4 pr-2 py-3"
                                    >
                                        <span>Generate</span>
                                        <span className='bg-gray-500 rounded-[50%] w-6 h-6 flex items-center justify-center'>
                                            <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                            <StickyNote className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                            No Automations Available
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            We couldn't find any automation cards at the moment.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchAutomationCards()}
                        >
                            Try Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AutomationSec