import { useEffect, useRef } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";
import { useChatStore } from "@/store/chatStore";
import { Bot } from "lucide-react";

const Index = () => {
  const { chats, currentChatId, addChat } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  useEffect(() => {
    if (chats.length === 0) {
      addChat();
    }
  }, [chats.length, addChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold">
            {currentChat?.title || "New Chat"}
          </h1>
          <ApiKeyDialog />
        </header>
        <main className="flex-1 overflow-y-auto">
          {currentChat?.messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">How can I help you today?</h2>
                <p className="text-muted-foreground">
                  Start a conversation or upload an image
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </main>
        <ChatInput />
      </div>
    </div>
  );
};

export default Index;