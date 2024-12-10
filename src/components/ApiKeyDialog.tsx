import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "@/store/chatStore";

export const ApiKeyDialog = () => {
  const { apiKey, setApiKey } = useChatStore();
  const [key, setKey] = useState(apiKey || "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setApiKey(key);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>xAI API Settings</DialogTitle>
          <DialogDescription>
            Enter your xAI API key to enable chat functionality.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your xAI API key"
            type="password"
          />
          <Button onClick={handleSave} className="w-full">
            Save API Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};