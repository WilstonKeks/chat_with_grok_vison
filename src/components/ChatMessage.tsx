import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "py-8 px-4 flex items-start gap-4",
        isUser ? "bg-chat-user" : "bg-chat-ai"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary" : "bg-primary/20"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </div>
      <div className="flex-1 space-y-4">
        <div className="prose prose-invert max-w-none">
          {message.content}
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Uploaded content"
              className="max-w-md rounded-lg mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};