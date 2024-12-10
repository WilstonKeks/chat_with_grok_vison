import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chatStore";
import { PlusCircle, MessageSquare, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export const ChatSidebar = () => {
  const { chats, currentChatId, addChat, deleteChat, setCurrentChat, updateChatTitle } =
    useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const startEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = (id: string) => {
    updateChatTitle(id, editTitle);
    setEditingId(null);
  };

  return (
    <div className="w-64 bg-[#222633] h-screen p-4 flex flex-col">
      <Button
        onClick={addChat}
        className="w-full mb-4 bg-primary hover:bg-primary/90"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Chat
      </Button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer ${
              chat.id === currentChatId
                ? "bg-primary/20"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setCurrentChat(chat.id)}
          >
            <div className="flex-1 min-w-0">
              {editingId === chat.id ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => saveEdit(chat.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(chat.id)}
                  className="h-6 text-sm"
                  autoFocus
                />
              ) : (
                <>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    <span className="truncate text-sm">{chat.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(chat.timestamp, "MMM d, yyyy")}
                  </span>
                </>
              )}
            </div>
            {chat.id === currentChatId && !editingId && (
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(chat.id, chat.title);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};