import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Profile from "@/assets/logo.png";

const ChatHeader = () => {
    const navigate = useNavigate()
    return (
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border-0 p-0 z-10"
            >
                <ChevronLeft className="w-5 h-5 text-black" />
            </Button>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-gray-100 px-1 py-1 rounded-full border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center">
                    <img
                        src={Profile}
                        alt="Profile"
                        className="w-full h-full"
                    />
                </div>
                <span className="text-foreground text-sm mr-1">Chatterbox AI</span>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border-0 p-0 z-10"
            >
                <MoreHorizontal className="w-5 h-5 text-black" />
            </Button>
        </header>
    )
}

export default ChatHeader