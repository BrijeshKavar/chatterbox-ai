import { Send, Paperclip, Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchChatById } from "@/components/mockChats";
import MarkdownMessage from "./MarkdownMessage";
import Profile from "@/assets/logo.png";

const ChatBody = () => {
    const location = useLocation();
    const { id: encodedId } = useParams<{ id?: string }>();
    const id = encodedId ? atob(decodeURIComponent(encodedId)) : undefined;
    const [isFetching, setIsFetching] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const initializedRef = useRef(false)

    // Fetch chat by id (only if id is present)
    useEffect(() => {
        if (isConnected) {
            if (id) {
                fetchChatById(id).then((chat) => {
                    if (chat) setMessages(chat.messages);
                    else setMessages([]);
                    setIsFetching(false)
                });
            } else {
                // If navigated with initialMessage in location.state, use it as the first user message
                const initialMessage = location.state?.initialMessage;
                if (initialMessage) {
                    setMessages([
                        {
                            id: `new-1`,
                            text: initialMessage,
                            isUser: true,
                            timestamp: new Date(),
                        },
                    ]);

                    // Send to mock WebSocket
                    wsRef.current!.send(JSON.stringify({ text: initialMessage }));
                } else {
                    setMessages([]);
                    setIsFetching(false)
                }
            }
        }
    }, [id, location.state, isConnected]);

    // Mock WebSocket implementation
    useEffect(() => {
        // Strictmode safe
        if (initializedRef.current) return
        initializedRef.current = true
      
        // Simulate WebSocket connection
        const mockWs = {
            send: (data: string) => {
                const message = JSON.parse(data);
                simulateBotResponse(message.text);
            },
            close: () => { },
        } as WebSocket;

        wsRef.current = mockWs;
        setIsConnected(true);

        return () => {
            if (wsRef.current) wsRef.current.close();
        };
    }, []);

    const simulateBotResponse = (userMessage: string) => {
        // Loading chat
        const loadingId = (Date.now() + Math.random()).toString()
        const loadingMessage: Message = {
            id: loadingId,
            text: "Chatterbox AI is typing...",
            isUser: false,
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, loadingMessage])
    
        let botResponse = "";
        if (userMessage.toLowerCase().includes("landing page") || userMessage.toLowerCase().includes("html")) {
            botResponse = `Here's a basic HTML/CSS code structure for your agency design landing page:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Agency Name - Design that Makes</title>
</head>
<body>
    <header>
        <nav>...</nav>
    </header>
    <main>
        <section class="hero">
            <h1>Design that Makes Impact</h1>
        </section>
    </main>
</body>
</html>
\`\`\`

This creates a clean, professional foundation for your landing page with proper SEO structure.
`;
        } else if (userMessage.toLowerCase().includes("photosynthesis")) {
            botResponse = "Photosynthesis is a fascinating process! Plants use sunlight, water, and carbon dioxide to create glucose and oxygen. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process occurs mainly in the chloroplasts of plant cells and is essential for all life on Earth.";
        } else if (userMessage.toLowerCase().includes("glucose")) {
            botResponse = "Plants use glucose in several important ways: 1) As an immediate energy source through cellular respiration, 2) Storage as starch for later use, 3) Building material for cellulose in cell walls, and 4) Transport as sucrose through the phloem to different parts of the plant.";
        } else {
            botResponse = `I understand you're asking about "${userMessage}". That's an interesting topic! I'm here to help you learn and explore various subjects. Could you provide more specific details about what you'd like to know?`;
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            isUser: false,
            timestamp: new Date(),
        };

        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== loadingId).concat(botMessage))
            setIsFetching(false)
        }, 1000 + Math.random() * 1000);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
        }
    }, [inputValue]);

    const handleSendMessage = () => {
        if ((!inputValue.trim() && !attachment) || !isConnected) return;
        const userMessage: Message = {
            id: `${id}-${messages.length + 1}`,
            text: `${inputValue.trim()}\n${attachment ? `📎 ${attachment.name}` : ''}`.trim(),
            isUser: true,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        if (wsRef.current) wsRef.current.send(JSON.stringify({ text: inputValue.trim() || attachment?.name }));
        setInputValue("");
        setAttachment(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleRecording = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = "en-US";
            recognition.onresult = (event: any) => {
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setInputValue(transcript);
            };
            recognition.onend = () => setIsRecording(false);
            recognitionRef.current = recognition;
            recognition.start();
            setIsRecording(true);
        }
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.length === 0 ?
                    isFetching ? <></> : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center bg-white border border-gray-200 rounded-3xl p-8 shadow-lg max-w-sm mx-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden fade-in mx-auto mb-4" style={{ animationDelay: '0.2s' }}>
                                    <img
                                        src={Profile}
                                        alt="Profile"
                                        className="w-full h-full"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Chatterbox AI</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Start a conversation and let me help you learn and explore various subjects!
                                </p>
                            </div>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isUser ? "justify-end" : "justify-start"} message-enter`}
                            >
                                <div className={`flex gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}>
                                    {!message.isUser && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 mt-1">
                                            <img
                                                src={Profile}
                                                alt="Profile"
                                                className="w-full h-full"
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={`px-4 py-3 text-black rounded-2xl max-w-[100%] ${message.isUser
                                            ? "bg-purple-200 rounded-br-md"
                                            : "bg-white rounded-bl-md border border-gray-200"
                                            }`}
                                    >
                                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.isUser ? (
                                                message.text
                                            ) : (
                                                <MarkdownMessage text={message.text} />
                                            )}
                                        </div>
                                        {/* <div className="text-xs opacity-70 mt-1">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
                <div className="flex items-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="w-4 h-4 text-black" />
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files?.[0]) setAttachment(e.target.files[0]);
                        }}
                    />
                    <div className="flex-1 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 flex items-center">
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Send a message"
                            className="w-full bg-transparent resize-none outline-none text-sm leading-5 max-h-32 min-h-[20px]"
                            rows={1}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleRecording}
                        className={`w-10 h-10 rounded-full ${isRecording ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                        <Mic className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="chat"
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={(!inputValue.trim() && !attachment) || !isConnected}
                        className="w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                {attachment && (
                    <div className="text-xs mt-2 text-gray-600 flex items-center gap-2">
                        📎 {attachment.name}
                        <button
                            onClick={() => setAttachment(null)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                )}
                {!isConnected && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Connecting to Chatterbox AI...
                    </p>
                )}
            </div>
        </>
    )
}

export default ChatBody