import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/chatStore";
import { ImagePlus, Send } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { currentChatId, apiKey, addMessage } = useChatStore();

  const handleSubmit = async () => {
    if (!message.trim() && !fileInputRef.current?.files?.length) return;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your xAI API key in the settings",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user" as const,
        content: message,
        timestamp: Date.now(),
      };

      if (fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          addMessage(currentChatId!, {
            ...userMessage,
            imageUrl: base64Image,
          });
        };
        reader.readAsDataURL(file);
      } else {
        addMessage(currentChatId!, userMessage);
      }

      // TODO: Implement actual API call to xAI
      const aiResponse = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: "This is a mock response. Implement xAI API integration.",
        timestamp: Date.now(),
      };
      addMessage(currentChatId!, aiResponse);

      setMessage("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="mx-auto max-w-3xl flex gap-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={() => {
            if (fileInputRef.current?.files?.length) {
              handleSubmit();
            }
          }}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          <ImagePlus className="h-4 w-4" />
        </Button>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[20px] max-h-[200px] resize-none"
          disabled={isLoading}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading || (!message.trim() && !fileInputRef.current?.files?.length)}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};