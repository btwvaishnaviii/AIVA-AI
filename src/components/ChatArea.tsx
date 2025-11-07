import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  sender: string;
  avatar: string;
  timestamp: string;
  isSent: boolean;
}

interface ChatAreaProps {
  chatName: string;
  chatAvatar: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatArea = ({ chatName, chatAvatar, messages, onSendMessage }: ChatAreaProps) => {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={chatAvatar} alt={chatName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {chatName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">{chatName}</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};
