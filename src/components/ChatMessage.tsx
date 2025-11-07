import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: string;
  avatar: string;
  timestamp: string;
  isSent: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        message.isSent && "flex-row-reverse"
      )}
    >
      <Avatar className="h-10 w-10 ring-2 ring-border">
        <AvatarImage src={message.avatar} alt={message.sender} />
        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
          {message.sender.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[70%]",
          message.isSent && "items-end"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {message.sender}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
        </div>
        
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 shadow-md transition-all hover:shadow-lg",
            message.isSent
              ? "bg-chat-bubble-sent text-primary-foreground rounded-br-sm"
              : "bg-chat-bubble-received text-card-foreground rounded-bl-sm border border-border"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};
