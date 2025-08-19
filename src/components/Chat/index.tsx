
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";

const Chat = () => {
    return (
        <div className="flex flex-col h-dvh bg-background">
            {/* Header */}
            <ChatHeader />

            {/* Body */}
            <ChatBody />
        </div>
    );
};

export default Chat;