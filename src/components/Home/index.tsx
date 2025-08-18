import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronRight, Zap } from 'lucide-react'
import AutomationSec from './AutomationSec'
import RecentChatSec from './RecentChatSec'
import HistoryBubbles from './HistorySec'
import Profile from "@/assets/logo.png"

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="px-6 pt-12 pb-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-8">
                    <div className="bg-gray-100 rounded-3xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">Try Premium</span>
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                    </div>

                    <div className="w-12 h-12 rounded-full overflow-hidden fade-in" style={{ animationDelay: '0.2s' }}>
                        <img
                            src={Profile}
                            alt="Profile"
                            className="w-full h-full"
                        />
                    </div>
                </div>

                <div className="flex-1 mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2 fade-in">
                        Hi, Adom!
                    </h1>
                    <p className="text-muted-foreground text-sm leading-relaxed fade-in" style={{ animationDelay: '0.1s' }}>
                        Revolutionize Your Learning Path with AI Guidance!
                    </p>
                </div>

                {/* Automations Section */}
                <AutomationSec />

                {/* Recent Chat Section */}
                <RecentChatSec />
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-24">
                <div className="space-y-4">
                    <HistoryBubbles />
                </div>
            </div>

            {/* Floating Start new chat button */}
            <div className="fixed bottom-6 left-6 right-6 z-50">
                <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-button-generate text-button-generate-foreground hover:bg-button-generate/90 rounded-3xl h-12 shadow-lg bg-black text-white hover:bg-gray-800 justify-between pl-4 pr-2"
                    onClick={() => navigate('/chat')}
                >
                    <span>Start new chat</span>
                    <span className='bg-gray-500 rounded-3xl w-9 h-9 flex items-center justify-center'>
                        <ChevronRight className="w-4 h-4" />
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default Home;