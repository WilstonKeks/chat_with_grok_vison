import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "@/types/chat";

interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  apiKey: string | null;
  addChat: () => void;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setApiKey: (key: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,
      apiKey: null,
      addChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
          timestamp: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
      },
      deleteChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId:
            state.currentChatId === id
              ? state.chats[0]?.id ?? null
              : state.currentChatId,
        })),
      setCurrentChat: (id) => set({ currentChatId: id }),
      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          ),
        })),
      updateChatTitle: (chatId, title) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        })),
      setApiKey: (key) => set({ apiKey: key }),
    }),
    {
      name: "chat-store",
    }
  )
);