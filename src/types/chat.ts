export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  imageUrl?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}